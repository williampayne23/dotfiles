
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
        "olimorris/codecompanion.nvim",
        config = function()
            require("codecompanion").setup({
                prompt_library = {
                    ["prefill"] = {
                        strategy = "chat",
                        description = "Prefill with buffer and editor",
                        opts = {
                            short_name = "prefill",
                            auto_submit = false,
                            stop_context_insertion = true,
                            user_prompt = false,
                        },
                        prompts = {
                            {
                                role = "user",
                                content = "#buffer:watch @editor",
                                opts = {
                                    contains_code = true,
                                }
                            },
                        },
                    }
                },
                display = {
                    action_palette = {
                        prompt = "Prompt ", -- Prompt used for interactive LLM calls
                        provider = "telescope", -- default|telescope|mini_pick
                        opts = {
                            show_default_actions = true, -- Show the default actions in the action palette?
                            show_default_prompt_library = true, -- Show the default prompt library in the action palette?
                        },
                    },
                    diff = {
                        enabled = true,
                        close_chat_at = 240, -- Close an open chat buffer if the total columns of your display are less than...
                        layout = "vertical", -- vertical|horizontal split for default provider
                        opts = { "internal", "filler", "closeoff", "algorithm:patience", "followwrap", "linematch:120" },
                        provider = "mini_diff", -- default|mini_diff
                    },
                    chat = {
                        window = {
                            position = "right"
                        }
                    },
                },
            });

            local wk = require("which-key")
            wk.add({
                { "<leader>c", group = "CodeCompanion" },
            });
            vim.keymap.set("n", "<leader>ca", "<cmd>CodeCompanionActions<CR>", {silent = true, desc = "Show code companion actions"})
            vim.keymap.set("n", "<leader>cc", "<cmd>CodeCompanion /prefill<CR>", {silent = true, desc = "Open new chat with access to buffer and editor"})
            vim.keymap.set("n", "<leader>ct", "<cmd>CodeCompanionChat Toggle<CR>", {silent = true, desc = "Toggle chat"})
            vim.keymap.set("n", "<leader><leader>", ":CodeCompanion #buffer ", {desc = "Code companion inline"})
        end
    },
}
