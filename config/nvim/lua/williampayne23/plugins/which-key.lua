return {
    {
        "folke/which-key.nvim",
        config = function()
            local wk = require("which-key")
            wk.setup {
                win = {
                    border = "single",        -- none, single, double, shadow
                    padding = { 0, 0, 0, 0 }, -- extra window padding [top, right, bottom, left]
                },
                layout = {
                    height = { min = 4, max = 10 }, -- min and max height of the columns
                    width = { min = 20, max = 50 }, -- min and max width of the columns
                    spacing = 3,                    -- spacing between columns
                    align = "left",                 -- align columns left, center or right
                },
            }
        end
    },
}
