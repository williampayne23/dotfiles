return {
    {
        "zbirenbaum/copilot.lua",
        event = "InsertEnter",
        -- enable = false,
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
        }
    },
    {
        "yetone/avante.nvim",
        event = "InsertEnter",
        version = false, -- Never set this value to "*"! Never!
        opts = {
            provider = "copilot",
            openai = {
                endpoint = "https://api.openai.com/v1",
                model = "gpt-4o",             -- your desired model (or use gpt-4o, etc.)
                timeout = 30000,              -- Timeout in milliseconds, increase this for reasoning models
                temperature = 0,
                max_completion_tokens = 8192, -- Increase this to include reasoning tokens (for reasoning models)
                --reasoning_effort = "medium", -- low|medium|high, only used for reasoning models
            },
            mappings = {
                focus = "<leader>aq",
                files = {
                    add_current = "<leader>af",
                }

            }

        },
        keys = {
            { "<leader>ac", "<cmd>AvanteClear<CR>", mode = "n", silent = true,  desc = "clear Chat" },
            { "<leader>a",  "<Nop>",                mode = "n", desc = "avante" }
        },
        -- if you want to build from source then do `make BUILD_FROM_SOURCE=true`
        build = "make",
        -- build = "powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false" -- for windows
        dependencies = {
            "nvim-treesitter/nvim-treesitter",
            "stevearc/dressing.nvim",
            "nvim-lua/plenary.nvim",
            "MunifTanjim/nui.nvim",
            --- The below dependencies are optional,
            "hrsh7th/nvim-cmp",            -- autocompletion for avante commands and mentions
            "nvim-tree/nvim-web-devicons", -- or echasnovski/mini.icons
            "zbirenbaum/copilot.lua",      -- for providers='copilot'
            {
                -- Make sure to set this up properly if you have lazy=true
                'MeanderingProgrammer/render-markdown.nvim',
                opts = {
                    file_types = { "markdown", "Avante" },
                },
                ft = { "markdown", "Avante" },
            },
        },
    },
}
