return {
    {
        "theprimeagen/harpoon",
        keys = {
            {
                "<leader>h",
                function()
                    require("harpoon.mark").add_file()
                end,
                desc = "add harpoon"
            },
            {
                "<C-e>",
                function()
                    require("harpoon.ui").toggle_quick_menu()
                end,
                desc = "toggle harpoon menu"
            },
            {
                "<C-h>",
                function()
                    require("harpoon.ui").nav_file(1)
                end,
                desc = "harpoon file 1"
            },
            {
                "<C-j>",
                function()
                    require("harpoon.ui").nav_file(2)
                end,
                desc = "harpoon file 2"
            },
            {
                "<C-k>",
                function()
                    require("harpoon.ui").nav_file(3)
                end,
                desc = "harpoon file 3"
            },
            {
                "<C-l>",
                function()
                    require("harpoon.ui").nav_file(4)
                end,
                desc = "harpoon file 4"
            },

        },
    }
}
