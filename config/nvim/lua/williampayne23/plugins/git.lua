return {
    {
        "NeogitOrg/neogit",
        commit = "bc0c609",
        dependencies = {
            "nvim-lua/plenary.nvim",         -- required
            "sindrets/diffview.nvim",        -- optional - Diff integration
            -- Only one of these is needed, not both.
            "nvim-telescope/telescope.nvim", -- optional
        },
        config = function()
            require('neogit').setup({
                kind = "replace"
            })
            vim.keymap.set("n", "<leader>g", "<cmd>Neogit<CR>")
        end
    },
    {
        "https://github.com/lewis6991/gitsigns.nvim",
        config = function()
            require('gitsigns').setup()
            vim.keymap.set("n", "<leader>b", "<cmd>Gitsigns blame_line<CR>")
        end
    }
}
