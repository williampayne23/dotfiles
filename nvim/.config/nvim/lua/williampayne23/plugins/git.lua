return {
    {
        "NeogitOrg/neogit",
        dependencies = {
            "nvim-lua/plenary.nvim",         -- required
            "nvim-telescope/telescope.nvim", -- optional
            "sindrets/diffview.nvim",        -- optional
            "ibhagwan/fzf-lua",              -- optional
        },
        config = function()
            local neogit = require("neogit")
            neogit.setup {
                kind = "replace",
            }
            vim.keymap.set("n", "<leader>g", "<cmd>Neogit<CR>")
        end

    },
    {
        "https://github.com/lewis6991/gitsigns.nvim",
        config = function()
            require('gitsigns').setup()
        end
    }
}
