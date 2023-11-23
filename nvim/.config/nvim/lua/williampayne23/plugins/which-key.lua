return {
    {
        "folke/which-key.nvim",
        config = function()
            local wk = require("which-key")
            wk.setup {
                window = {
                    border = "single", -- none, single, double, shadow
                    position = "bottom", -- bottom, top
                    margin = { 1, 1, 0, 1 }, -- extra window margin [top, right, bottom, left]. When between 0 and 1, will be treated as a percentage of the screen size.
                    padding = { 0, 0, 0, 0 }, -- extra window padding [top, right, bottom, left]
                    winblend = 0, -- value between 0-100 0 for fully opaque and 100 for fully transparent
                    zindex = 1000, -- positive value to position WhichKey above other floating windows.
                },
                layout = {
                    height = { min = 4, max = 10 }, -- min and max height of the columns
                    width = { min = 20, max = 50 }, -- min and max width of the columns
                    spacing = 3,    -- spacing between columns
                    align = "left", -- align columns left, center or right
                },
            }
            -- wk.register({
            --     f = {
            --         name = "file",                                             -- optional group name
            --         f = { "<cmd>Telescope find_files<cr>", "Find File" },      -- create a binding with label
            --         r = { "<cmd>Telescope oldfiles<cr>", "Open Recent File" }, -- additional options for creating the keymap
            --         n = { "New File" },                                        -- just a label. don't create any mapping
            --         e = "Edit File"                                            -- same as above
            --     }
            -- }, { prefix = "<leader>" })
        end
    },
}
