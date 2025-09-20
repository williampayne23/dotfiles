-- Contextual comments are set in treesitter.lua
return {
    {
        'numToStr/Comment.nvim',
        keys = {
            {
                "<leader>/",
                function()
                    require("Comment.api").toggle.linewise.current()
                end,
                desc = "Toggle Comment"
            },
            {
                "<leader>/",
                function()
                    local esc = vim.api.nvim_replace_termcodes(
                        '<ESC>', true, false, true
                    )
                    vim.api.nvim_feedkeys(esc, 'nx', false)
                    require("Comment.api").toggle.linewise(vim.fn.visualmode())
                end,
                desc = "Toggle Comment",
                mode = "x"
            },
        },
        config = function()
            require('Comment').setup {
                mappings = { basic = false, extra = false },
                pre_hook = require('ts_context_commentstring.integrations.comment_nvim').create_pre_hook(),
            }
        end,
    }
}
