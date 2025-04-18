return {
    "folke/snacks.nvim",
    ---@module "snacks"
    ---@type snacks.Config
    opts = {
        dashboard = {
            -- your dashboard configuration comes here
            -- or leave it empty to use the default settings
            -- refer to the configuration section below
        },
        explorer = {
            replace_netrw = true,
            -- your explorer configuration comes here
            -- or leave it empty to use the default settings
            -- refer to the configuration section below
        },
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
        quickfile = {
        },
        indent = {
            -- your indent configuration comes here
            -- or leave it empty to use the default settings
            -- refer to the configuration section below
        },
        notifier = {


        }
    },
    lazy = false,
    keys = {
        { "<leader>pv", "<cmd>lua Snacks.explorer.open()<cr>",    desc = "File Explorer" },
        { "<leader>pf", "<cmd>lua Snacks.picker.files()<cr>",     desc = "Find Files" },
        { "<leader>pg", "<cmd>lua Snacks.picker.git_files()<cr>", desc = "Find Git Files" },
        { "<leader>ps", "<cmd>lua Snacks.picker.git_grep()<cr>",  desc = "Grep Files" },
    }
}
