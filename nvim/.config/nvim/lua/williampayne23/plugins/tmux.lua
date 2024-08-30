return {
{
    'christoomey/vim-tmux-navigator',
    -- For whatever reason keybinds don't work if we load normally so we load on "VeryLazy" to force the plugin to load after vim
    -- is properly started and that fixes it
    event = "VeryLazy",
    config = function()
        -- vim.keymap.set("n", "˙", "<cmd>TmuxNavigateLeft<CR>")
        -- vim.keymap.set("n", "∆", "<cmd>TmuxNavigateDown<CR>")
        -- vim.keymap.set("n", "˚", "<cmd>TmuxNavigateUp<CR>")
        -- vim.keymap.set("n", "¬", "<cmd>TmuxNavigateRight<CR>")
    end
},
}
