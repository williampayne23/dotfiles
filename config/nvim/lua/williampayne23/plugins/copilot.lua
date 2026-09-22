return {
	{
		"zbirenbaum/copilot.lua",
		event = "InsertEnter",
		keys = {
			{
				"<Right>",
				function()
					local cursorCol = vim.fn.col(".")
					if require("copilot.suggestion").is_visible() then
						-- if cursorCol == vim.fn.col("$") then
						require("copilot.suggestion").accept()
					else
						vim.cmd(string.format(":call cursor(%d, %d)", vim.fn.line("."), cursorCol + 1))
					end
				end,
				mode = "i",
				desc = "Accept Copilot suggestion",
				silent = true,
			},
		},
		main = "copilot",
		opts = {
			suggestion = {
				auto_trigger = true,
			},
		},
	},
}
