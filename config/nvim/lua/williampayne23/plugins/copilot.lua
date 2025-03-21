
return {
    {
        "zbirenbaum/copilot.lua",
        -- enable = false,
        config = function()
            require("copilot").setup({
                suggestion = {
                    auto_trigger = true,
                }
            })
            vim.keymap.set("i", "<Right>", function()
                local cursorCol = vim.fn.col(".")
                if require("copilot.suggestion").is_visible() then
                    -- if cursorCol == vim.fn.col("$") then
                    require("copilot.suggestion").accept()
                else
                    vim.cmd(string.format(":call cursor(%d, %d)", vim.fn.line("."), cursorCol + 1))
                end
            end, {silent = true})
        end
    },
    {
        "yetone/avante.nvim",
        event = "VeryLazy",
        version = false, -- Never set this value to "*"! Never!
        config = function()
            require("avante").setup({
                -- your configuration comes here
                -- or leave it empty to use the default settings
                -- refer to the configuration section below
                -- for all available options
                provider = "copilot",
                openai = {
                    endpoint = "https://api.openai.com/v1",
                    model = "gpt-4o", -- your desired model (or use gpt-4o, etc.)
                    timeout = 30000, -- Timeout in milliseconds, increase this for reasoning models
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
            })
            vim.keymap.set("n", "<leader>ac", "<cmd>AvanteClear<CR>", {silent = true, desc = "Clear Chat"})
        end,
        -- if you want to build from source then do `make BUILD_FROM_SOURCE=true`
        build = "make",
        -- build = "powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false" -- for windows
        dependencies = {
            "nvim-treesitter/nvim-treesitter",
            "stevearc/dressing.nvim",
            "nvim-lua/plenary.nvim",
            "MunifTanjim/nui.nvim",
            --- The below dependencies are optional,
            "echasnovski/mini.pick", -- for file_selector provider mini.pick
            "nvim-telescope/telescope.nvim", -- for file_selector provider telescope
            "hrsh7th/nvim-cmp", -- autocompletion for avante commands and mentions
            "ibhagwan/fzf-lua", -- for file_selector provider fzf
            "nvim-tree/nvim-web-devicons", -- or echasnovski/mini.icons
            "zbirenbaum/copilot.lua", -- for providers='copilot'
            {
                -- support for image pasting
                "HakonHarnes/img-clip.nvim",
                event = "VeryLazy",
                opts = {
                    -- recommended settings
                    default = {
                        embed_image_as_base64 = false,
                        prompt_for_file_name = false,
                        drag_and_drop = {
                            insert_mode = true,
                        },
                        -- required for Windows users
                        use_absolute_path = true,
                    },
                },
            },
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
-- {
    --     "olimorris/codecompanion.nvim",
    --     config = function()
    --         require("codecompanion").setup({
    --             prompt_library = {
    --                 ["prefill"] = {
    --                     strategy = "chat",
    --                     description = "Prefill with buffer and editor",
    --                     opts = {
    --                         short_name = "prefill",
    --                         auto_submit = false,
    --                         stop_context_insertion = true,
    --                         user_prompt = false,
    --                     },
    --                     prompts = {
    --                         {
    --                             role = "user",
    --                             content = "#buffer:watch @editor",
    --                             opts = {
    --                                 contains_code = true,
    --                             }
    --                         },
    --                     },
    --                 }
    --             },
    --             display = {
    --                 action_palette = {
    --                     prompt = "Prompt ", -- Prompt used for interactive LLM calls
    --                     provider = "telescope", -- default|telescope|mini_pick
    --                     opts = {
    --                         show_default_actions = true, -- Show the default actions in the action palette?
    --                         show_default_prompt_library = true, -- Show the default prompt library in the action palette?
    --                     },
    --                 },
    --                 diff = {
    --                     enabled = true,
    --                     close_chat_at = 240, -- Close an open chat buffer if the total columns of your display are less than...
    --                     layout = "vertical", -- vertical|horizontal split for default provider
    --                     opts = { "internal", "filler", "closeoff", "algorithm:patience", "followwrap", "linematch:120" },
    --                     provider = "mini_diff", -- default|mini_diff
    --                 },
    --                 chat = {
    --                     window = {
    --                         position = "right"
    --                     }
    --                 },
    --             },
    --         });
    --
    --         local wk = require("which-key")
    --         wk.add({
    --             { "<leader>c", group = "CodeCompanion" },
    --         });
    --         vim.keymap.set("n", "<leader>ca", "<cmd>CodeCompanionActions<CR>", {silent = true, desc = "Show code companion actions"})
    --         vim.keymap.set("n", "<leader>cc", "<cmd>CodeCompanion /prefill<CR>", {silent = true, desc = "Open new chat with access to buffer and editor"})
    --         vim.keymap.set("n", "<leader>ct", "<cmd>CodeCompanionChat Toggle<CR>", {silent = true, desc = "Toggle chat"})
    --         vim.keymap.set("n", "<leader><leader>", ":CodeCompanion #buffer ", {desc = "Code companion inline"})
    --     end
    -- },
}
