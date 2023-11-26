return {
    {
        'christoomey/vim-tmux-navigator',
        -- For whatever reason keybinds don't work if we load normally so we load on "VeryLazy" to force the plugin to load after vim
        -- is properly started and that fixes it
        event = "VeryLazy",
        config = function()
            vim.g.tmux_navigator_no_mappings = 1
            vim.keymap.set("n", "<M-h", "<cmd>TmuxNavigateLeft<CR>")
            vim.keymap.set("n", "˙", "<cmd>TmuxNavigateLeft<CR>")
            vim.keymap.set("n", "∆", "<cmd>TmuxNavigateDown<CR>")
            vim.keymap.set("n", "˚", "<cmd>TmuxNavigateUp<CR>")
            vim.keymap.set("n", "¬", "<cmd>TmuxNavigateRight<CR>")
        end
    },
    'ThePrimeagen/vim-be-good',
    {
        "folke/persistence.nvim",
        event = "BufReadPre", -- this will only start session saving when an actual file was opened
        opts = {
            -- add any custom options here
        }
    },
    { "catppuccin/nvim", name = "catppuccin", priority = 1000 },
    'eandrju/cellular-automaton.nvim',
    {
        "kawre/leetcode.nvim",
        build = ":TSUpdate html",
        dependencies = {
            "nvim-telescope/telescope.nvim",
            "nvim-lua/plenary.nvim", -- required by telescope
            "MunifTanjim/nui.nvim",

            -- optional
            "nvim-treesitter/nvim-treesitter",
            -- "rcarriga/nvim-notify",
            "nvim-tree/nvim-web-devicons",
        },
        opts = {
            -- configuration goes here
            lang = "python",
            logging = false,
            description = {
                position = "left", ---@type "top" | "right" | "bottom" | "left"

                width = "90%", ---@type string | integer
            },
            hooks = {
                LeetEnter = { function()
                    vim.keymap.set("n", "<leader>lt", "<cmd>Leet test<CR>")
                    vim.keymap.set("n", "<leader>ll", "<cmd>Leet menu<CR>")
                    vim.keymap.set("n", "<leader>ld", "<cmd>Leet desc<CR>")
                    vim.keymap.set("n", "<leader>li", "<cmd>Leet info<CR>")
                    vim.keymap.set("n", "<leader>lr", "<cmd>Leet submit<CR>")
                end }
            }
        },
    }
}
