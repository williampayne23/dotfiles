return {
    { "zbirenbaum/copilot.lua",
        -- enable = false,
        config = function()
            require("copilot").setup({
                suggestion = {
                    auto_trigger = true,
                }
            })
            vim.keymap.set("i", "<Right>", function()

                local cursorCol = vim.fn.col(".");
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
        "CopilotC-Nvim/CopilotChat.nvim",
        dependencies = {
            { "github/copilot.vim" }, -- or zbirenbaum/copilot.lua
            { "nvim-lua/plenary.nvim", branch = "master" }, -- for curl, log and async functions
        },
        build = "make tiktoken", -- Only on MacOS or Linux
        opts = {
            -- See Configuration section for options
        },
        -- See Commands section for default commands if you want to lazy load on them
    },
}
