return {
    {
        "NeogitOrg/neogit",
        dependencies = {
            "nvim-lua/plenary.nvim", -- required
        },
        cmd = "Neogit",
        keys = {
            { "<leader>g", "<cmd>Neogit<CR>", mode = "n", desc = "Neogit" }
        },
        opts = { kind = "replace" },
    },
    {
        "https://github.com/lewis6991/gitsigns.nvim",
        event = "BufReadPost",
        keys = {
            { "<leader>b", "<cmd>Gitsigns blame_line<CR>", mode = "n", desc = "Git Blame" }
        },
        main = "gitsigns",
        config = true,
    }
}
