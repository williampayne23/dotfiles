local M = {}

-- =========================================================
-- Find current file
-- =========================================================
local function get_file()
	local buf = vim.api.nvim_buf_get_name(0)
	if buf == "" then
		return nil
	end
	return vim.fn.fnamemodify(buf, ":p")
end

-- =========================================================
-- Find nearest Makefile upward
-- =========================================================
local function find_root(start_dir)
	local dir = start_dir

	while dir and dir ~= "/" do
		if vim.fn.filereadable(dir .. "/Makefile") == 1 then
			return dir
		end
		dir = vim.fn.fnamemodify(dir, ":h")
	end

	return nil
end

local function get_makefile_contents(root)
	local path = root .. "/Makefile"
	local handle = io.open(path, "r")
	if not handle then
		return nil
	end
	return handle
end

-- =========================================================
-- Parse Makefile targets + metadata
-- Convention:
--   target: ## description @quickfix
-- =========================================================
local function parse_targets(root)
	-- This is all god awful chatgpt free tier code and can probably be way better.
	local handle = get_makefile_contents(root)

	local list = {}

	local function add_target(t, line)
		local desc = line:match("#%s*(.+)")
		local qf = false
		if desc then
			qf = desc:find("@quickfix") ~= nil
			desc = desc:gsub("@quickfix", ""):gsub("%s+$", "")
		end

		local target = {
			text = t .. (desc and (" - " .. desc) or ""),
			value = t,
			quickfix = qf,
		}
		-- ----------------------------
		-- OPTIONAL COMMENT METADATA
		-- ----------------------------
		table.insert(list, target)
	end

	for line in handle:lines() do
		line = line:match("^%s*(.-)%s*$")

		local t = line:match("^([%w%-%_%.]+):")
		if t and not t:match("^%.") then
			add_target(t, line)
		end
	end

	handle:close()

	return list
end
-- =========================================================
-- Run command (async)
-- =========================================================
local function run(root, item, file)
	-- TODO Awful chat gpt code make it better
	local cmd = {
		"make",
		"-C",
		root,
		item.value,
		"FILE=" .. file,
	}

	vim.system(cmd, { text = true }, function(res)
		vim.schedule(function()
			local output = (res.stdout or "") .. "\n" .. (res.stderr or "")

			-- ----------------------------------------
			-- QUICKFIX MODE (from Makefile annotation)
			-- ----------------------------------------
			if item.quickfix then
				local qf = {}

				for line in output:gmatch("[^\n]+") do
					local f, lnum, msg = line:match("([^:]+):(%d+):?%d*:?(.*)")

					if f and lnum then
						table.insert(qf, {
							filename = f,
							lnum = tonumber(lnum),
							text = msg or line,
						})
					end
				end

				vim.fn.setqflist(qf, "r")
				vim.cmd("copen")

				return
			end

			-- ----------------------------------------
			-- NORMAL MODE
			-- ----------------------------------------
			if res.code ~= 0 then
				vim.notify(output, vim.log.levels.ERROR)
			else
				vim.notify("Done: " .. item.text)
			end
		end)
	end)
end

function M.get_makefile_path() end

function M.get_all_targets()
	local file = get_file() or vim.fn.getcwd()
	local root = find_root(file)
	if not root then
		vim.notify("No Makefile found", vim.log.levels.ERROR)
		return nil
	end

	local targets = parse_targets(root)
	return targets, root, file
end

-- =========================================================
-- Picker
-- =========================================================
function M.pick()
	local targets, root, file = M.get_all_targets()

	if targets == nil or #targets == 0 then
		vim.notify("No targets found", vim.log.levels.WARN)
		return
	end

	if #targets == 1 then
		M.first()
		return
	end

	Snacks.picker({
		title = "Make Targets",

		layout = {
			preset = "select",
		},

		items = targets,

		format = "text",

		confirm = function(picker, item)
			run(root, item, file)
			picker:close()
		end,
	})
end

function M.first()
	local targets, root, file = M.get_all_targets()

	if targets == nil or #targets == 0 then
		vim.notify("No targets found", vim.log.levels.WARN)
		return
	end

	run(root, targets[1], file)
end

-- =========================================================
-- Setup command
-- =========================================================
function M.setup()
	vim.api.nvim_create_user_command("MakePick", function()
		M.pick()
	end, {})

	vim.api.nvim_create_user_command("MakeFirst", function()
		M.first()
	end, {})

	vim.keymap.set("n", "<leader>mp", M.pick, { desc = "Pick Makefile Target" })
	vim.keymap.set("n", "<leader>mf", M.first, { desc = "Run First Makefile Target" })
	vim.keymap.set("n", "<leader><leader>", M.first, { desc = "Pick Makefile Target" })
end

return M
