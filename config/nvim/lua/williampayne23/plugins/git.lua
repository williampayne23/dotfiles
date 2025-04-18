return {
    {
        "NeogitOrg/neogit",
        lazy = false,
        dependencies = {
            "nvim-lua/plenary.nvim", -- required
        },
        keys = {
            { "<leader>g", "<cmd>Neogit<CR>", mode = "n", desc = "neogit" }
        },
        opts = { kind = "replace" },
    },
    {
        "https://github.com/lewis6991/gitsigns.nvim",
        lazy = false,
        keys = {
            { "<leader>b", "<cmd>Gitsigns blame_line<CR>", mode = "n", desc = "git blame" }
        },
        main = "gitsigns",
        config = true,
    }
}
