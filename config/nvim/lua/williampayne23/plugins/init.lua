return {
    {
        "catppuccin/nvim",
        name = "catppuccin",
        priority = 1,
        config = function()
            local orig_util_open_floating_preview = vim.lsp.util.open_floating_preview
            ---@diagnostic disable-next-line: duplicate-set-field
            function vim.lsp.util.open_floating_preview(contents, syntax, opts, ...)
                opts = opts or {}
                opts.border = "rounded" -- Or any other border
                return orig_util_open_floating_preview(contents, syntax, opts, ...)
            end

            require("catppuccin").setup({
                custom_highlights = function(colors)
                    return {
                        FloatBorder = { bg = colors.none, fg = colors.blue },
                        NormalFloat = { bg = colors.none, fg = colors.blue },

                        TreesitterContext = { bg = colors.none },
                        TreesitterContextLineNumber = { bg = colors.none },
                        TreesitterContextBottom = { underline = colors.flamingo },
                        TreesitterContextSeperator = { bg = colors.flamingo },

                        CursorColumn = { bg = colors.none },
                        CursorLineNr = { fg = colors.blue },

                        BlinkCmpMenu = { bg = colors.none, fg = colors.blue },
                        BlinkCmpMenuBorder = { bg = colors.none, fg = colors.blue },
                        BlinkCmpScrollBarGutter = { bg = colors.none, fg = colors.blue },
                    }
                end,
                integrations = {
                    notify = true,
                    which_key = true,
                    telescope = true,
                    harpoon = true,
                    treesitter_context = true,
                    treesitter = true,
                    blink_cmp = {
                        style = "bordered",
                    }
                },
                float = {
                    solid = true,
                    transparent = false,
                }
            })
        end
    }
}
