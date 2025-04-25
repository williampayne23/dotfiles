return {
    {
        "folke/which-key.nvim",
        dependencies = {
            {
                "echasnovski/mini.nvim",
                config = function()
                    require("mini.icons").setup()
                    MiniIcons.mock_nvim_web_devicons()
                end
            }
        },
        event = "VeryLazy",
        ---@module "which-key"
        ---@class wk.Opts
        opts = {
            win = {
                border = "single",        -- none, single, double, shadow
                padding = { 0, 0, 0, 0 }, -- extra window padding [top, right, bottom, left]
            },
            layout = {
                height = { min = 4, max = 12 }, -- min and max height of the columns
                width = { min = 20, max = 50 }, -- min and max width of the columns
                spacing = 3,                    -- spacing between columns
                align = "left",                 -- align columns left, center or right
            },
            icons = {
                breadcrumb = "»", -- symbol used in the command line area that shows your active key combo
                separator = "➜", -- symbol used between a key and it's label
                group = "… ", -- symbol prepended to a group
                ---@module "which-key"
                ---@type wk.IconRule[]
                rules = {
                    -- I wish I could do this with built in keybinds but this is my hacky trick
                    -- Seems better than coupling wk to keybinds
                    { plugin = "neogit", icon = "󰊢", color = "orange" },
                    { pattern = "delete", icon = "󰆴", color = "red" },
                    { pattern = "newline*", icon = "" },
                    { pattern = "replace*", icon = "󰛔" },
                    { pattern = "undo*", icon = "" },
                    { pattern = "yank*", icon = "" },
                    { pattern = "avante", icon = "󱙺" },
                    { pattern = "pickers", icon = "" },
                    { pattern = "swap", icon = "󰓡" },
                    { pattern = "lsp", icon = "" },
                }
            },
        }
    },
}
