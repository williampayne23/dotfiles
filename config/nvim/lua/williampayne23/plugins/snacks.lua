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
        { "<leader>s",  function() Snacks.scratch() end,          desc = "Toggle Scratch Buffer" },
        { "<leader>t",  function() Snacks.terminal.toggle() end,  desc = "Toggle Terminal" },
        { "<leader>pv", "<cmd>lua Snacks.explorer.open()<cr>",    desc = "File Explorer" },
        { "<leader>pf", "<cmd>lua Snacks.picker.files()<cr>",     desc = "Find Files" },
        { "<leader>pg", "<cmd>lua Snacks.picker.git_files()<cr>", desc = "Find Git Files" },
        { "<leader>ps", "<cmd>lua Snacks.picker.git_grep()<cr>",  desc = "Grep Files" },
        { "<leader>p",  "<Nop>",                                  desc = "Pickers" }
    }
}
