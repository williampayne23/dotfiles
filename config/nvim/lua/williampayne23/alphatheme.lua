local M = {}

M.dashboard = {}

function M.setup()
    require "alpha.term"

    local plugin = require "alpha"
    local fs = require "editor.fs"

    M.dashboard = require "alpha.themes.dashboard"

    local section = {}

    section.padding = function(lines) return { type = "padding", val = lines } end

    -- Text-based header
    section.header = {
        type = "text",
        val = {
            [[                                                                     ]],
            [[       ███████████           █████      ██                     ]],
            [[      ███████████             █████                             ]],
            [[      ████████████████ ███████████ ███   ███████     ]],
            [[     ████████████████ ████████████ █████ ██████████████   ]],
            [[    ██████████████    █████████████ █████ █████ ████ █████   ]],
            [[  ██████████████████████████████████ █████ █████ ████ █████  ]],
            [[ ██████  ███ █████████████████ ████ █████ █████ ████ ██████ ]],
        },
        opts = {
            hl = "Type",
            position = "center",
        },
    }

    -- Terminal-based header
    -- section.header = {
    --     type = "terminal",
    --     command = "~/.config/nvim/logo.sh -c",
    --     width = 70,
    --     height = 10,
    --     opts = {
    --         redraw = true,
    --         window_config = {
    --             zindex = 1,
    --         },
    --     },
    -- }

    section.project = {
        type = "text",
        val = fs.root { capitalize = true },
        opts = {
            hl = "AlphaTitle",
            position = "center",
        },
    }

    section.buttons = {
        type = "group",
        val = {
            M.dashboard.button("n", "  Create file", "<cmd>enew<CR>"),
            M.dashboard.button("e", "  Explore project", "<cmd>NvimTreeOpen<CR>"),
            M.dashboard.button("f", "  Find file", "<cmd>Telescope find_files<CR>"),
            M.dashboard.button("s", "󰍉  Find text", "<cmd>Telescope live_grep <CR>"),
            M.dashboard.button("q", "  Quit", "<cmd>qa<CR>"),
        },
        opts = {
            spacing = 1,
        },
    }

    for _, button in ipairs(section.buttons.val) do
        button.opts.hl = "Normal"
        button.opts.hl_shortcut = "AlphaShortcut"
    end

    section.footer = {
        type = "text",
        val = "",
        opts = {
            hl = "Comment",
            position = "center",
        },
    }

    M.dashboard.config.layout = {
        section.padding(12),
        section.header,
        section.padding(2),
        section.project,
        section.padding(1),
        section.buttons,
        section.padding(1),
        section.footer,
    }

    M.dashboard.section = section
    plugin.setup(M.dashboard.config)
end

function M.is_active()
    return vim.bo.filetype == "alpha"
end

function M.update_footer()
    local lazy = require "lazy"

    local stats = lazy.stats()
    local ms = (math.floor(stats.startuptime * 100 + 0.5) / 100)

    M.dashboard.section.footer.val = "  in " .. ms .. "ms"

    pcall(function() vim.cmd "AlphaRedraw" end)
end

function M.on_open()
    local lualine = require "lualine"
    lualine.hide()
    vim.o.laststatus = 0
    vim.o.ruler = false
end

function M.on_close()
    local lualine = require "lualine"
    if os.getenv("ZELLIJ") ~= "0" and os.getenv("TMUX") == "" then
        lualine.hide({ unhide = true })
    end
end

return M
