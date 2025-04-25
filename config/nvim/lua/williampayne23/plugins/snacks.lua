return {
    "folke/snacks.nvim",
    ---@module "snacks"
    ---@type snacks.Config
    opts = {
        animate = {},
        bigfile = {},
        dashboard = {},
        explorer = {
            -- your explorer configuration comes here
            -- or leave it empty to use the default settings
            -- refer to the configuration section below
            replace_netrw = true,
        },
        indent = {},
        notifier = {},
        picker = {
            -- your picker configuration comes here
            -- or leave it empty to use the default settings
            -- refer to the configuration section below
            sources = {
                explorer = {
                    -- focus = "input",
                    auto_close = true,
                    finder = "explorer",
                }
            }
        },
        quickfile = {},
        scratch = {},
        -- scroll = {},
        terminal = {},
        words = {},
        zen = {}
    },
    lazy = false,
    keys = {
        {
            "]r",
            function()
                if vim.v.count == 0 then
                    Snacks.words.jump(1, true)
                end
                Snacks.words.jump(vim.v.count, true)
            end,
            desc = "Next Ref"
        },
        {
            "[r",
            function()
                if vim.v.count == 0 then
                    Snacks.words.jump(-1, true)
                end
                Snacks.words.jump(-vim.v.count, true)
            end,
            desc = "Previous Ref"
        },
        -- { "<leader>t",  function() Snacks.terminal.toggle() end,  desc = "Toggle Terminal" },
        { "<leader>pv", function() Snacks.explorer.open() end,      desc = "File Explorer" },
        { "<leader>pf", function() Snacks.picker.files() end,       desc = "Find Files" },
        { "<leader>pg", function() Snacks.picker.git_files() end,   desc = "Find Git Files" },
        { "<leader>ps", function() Snacks.picker.git_grep() end,    desc = "Grep Files" },
        { "<leader>pS", function() Snacks.picker.lsp_symbols() end, desc = "Find Symbols" },
        { "<leader>pp", function() Snacks.picker.pickers() end,     desc = "Find Symbols" },
        { "<leader>p",  "<Nop>",                                    desc = "Pickers" }
    },
    init = function()
        local Snacks = require("snacks")
        Snacks.toggle.new({
            id = "sb",
            name = "Scratch Buffer",
            get = function()
                local buf = vim.api.nvim_get_current_buf()
                local name = vim.api.nvim_buf_get_name(buf)
                local scratch_bufs = Snacks.scratch.list()
                for _, scratch_buf in ipairs(scratch_bufs) do
                    local file = scratch_buf.file
                    if file == name then
                        return true
                    end
                end
                return false
            end,
            set = function(state)
                Snacks.scratch()
            end,
            notify = false
        }):map("<leader>s")
    end
}
