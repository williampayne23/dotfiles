vim.o.termguicolors = true
vim.opt.cursorline = true
vim.opt.cursorlineopt = "number"

require("catppuccin").setup({
    custom_highlights = function(colors)
        return {
            TreesitterContext = { bg = colors.none },
            TreesitterContextLineNumber = {bg = colors.none},
            TreesitterContextBottom = { underline = colors.flamingo },
            TreesitterContextSeperator = { bg = colors.flamingo },
            NormalFloat = { bg = colors.none },
            StatusLine = { bg = colors.none },
            -- lualine_b_normal = { bg = colors.none },
            CursorColumn = { bg = colors.none },
            FloatBorder = { fg = colors.blue },
            BorderBG = { fg = colors.blue },
            CursorLineNr = { fg = colors.blue },
        }
    end,
	integrations = {
        notify = true,
        which_key= true,
        telescope = true,
		cmp = true,
        harpoon = true,
        treesitter_context = true,
        treesitter = true
	}
})

vim.cmd.colorscheme "catppuccin-frappe"

