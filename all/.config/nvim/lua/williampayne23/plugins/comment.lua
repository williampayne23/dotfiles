-- Contextual comments are set in treesitter.lua
return {
     {
         'numToStr/Comment.nvim',
         opts = {
             -- add any options here
         },
         lazy = false,
         config = function()
             require("Comment").setup({
                 mappings = {basic = false, extra = false},
                 pre_hook = require('ts_context_commentstring.integrations.comment_nvim').create_pre_hook(),
             })
             local api = require("Comment.api")
             vim.keymap.set('n', '<leader>/', api.toggle.linewise.current, {desc = "toggle comment"})

             local esc = vim.api.nvim_replace_termcodes(
                 '<ESC>', true, false, true
             )

             vim.keymap.set('x', '<leader>/', function()
                 vim.api.nvim_feedkeys(esc, 'nx', false)
                 api.toggle.linewise(vim.fn.visualmode())
             end, {desc = "toggle comment"})
         end
     }
}
