return {
    {
        'goolord/alpha-nvim',
        event = "VimEnter",
        dependencies = { 'nvim-tree/nvim-web-devicons' },
        config = function()
            require("williampayne23.alphatheme").setup()
            vim.api.nvim_create_autocmd("User", {
                pattern = "LazyVimStarted",
                once = true,
                callback = require("williampayne23.alphatheme").update_footer,
            })
        end
    }
}
