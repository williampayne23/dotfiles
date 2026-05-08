return {
	{
		"leissa/vim-acme",
		ft = "asm68k",
	},
	{
		"nvim-treesitter/nvim-treesitter",
		dependencies = {
			{ "nvim-treesitter/nvim-treesitter-context", lazy = true },
			{ "JoosepAlviste/nvim-ts-context-commentstring", lazy = true },
			{ "nvim-treesitter/nvim-treesitter-textobjects", lazy = true, branch = "main" },
			{ "Wansmer/sibling-swap.nvim", lazy = true },
		},
		branch = "main",
		lazy = true,
		build = ":TSUpdate",
		event = { "BufReadPre", "BufNewFile" },
		opts = {

			incremental_selection = {
				enable = true,
				keymaps = {
					init_selection = "<C-space>",
					node_incremental = "<C-space>",
					scope_incremental = false,
					node_decremental = "<bs>",
				},
			},

			-- Install parsers synchronously (only applied to `ensure_installed`)
			sync_install = false,

			-- Automatically install missing parsers when entering buffer
			-- Recommendation: set to false if you don't have `tree-sitter` CLI installed locally
			auto_install = true,
		},
		init = function(_, _)
			require("nvim-treesitter").setup({
				install_dir = vim.fn.stdpath("data") .. "/site",
			})
			local ensureInstalled = {
				"json",
				"javascript",
				"typescript",
				"tsx",
				"yaml",
				"html",
				"css",
				"prisma",
				"markdown",
				"markdown_inline",
				"svelte",
				"graphql",
				"bash",
				"lua",
				"vim",
				"dockerfile",
				"gitignore",
				"query",
				-- ... your parsers
			}
			require("nvim-treesitter").install(ensureInstalled)
			vim.api.nvim_create_autocmd("FileType", {
				callback = function()
					-- Enable treesitter highlighting and disable regex syntax
					pcall(vim.treesitter.start)
					-- Enable treesitter-based indentation
					vim.bo.indentexpr = "v:lua.require'nvim-treesitter'.indentexpr()"
				end,
			})
			vim.g.skip_ts_context_commentstring_module = true
			require("ts_context_commentstring").setup({})
			require("treesitter-context").setup({
				enable = true, -- Enable this plugin (Can be enabled/disabled later via commands)
				max_lines = 3, -- How many lines the window should span. Values <= 0 mean no limit.
				min_window_height = 0, -- Minimum editor window height to enable context. Values <= 0 mean no limit.
				line_numbers = true,
				multiline_threshold = 20, -- Maximum number of lines to show for a single context
				trim_scope = "outer", -- Which context lines to discard if `max_lines` is exceeded. Choices: 'inner', 'outer'
				mode = "cursor", -- Line used to calculate context. Choices: 'cursor', 'topline'
				-- Separator between context and content. Should be a single character string, like '-'.
				-- When separator is set, the context will only show up when there are at least 2 lines above cursorline.
				separator = nil,
				zindex = 1, -- The Z-index of the context window
				on_attach = nil, -- (fun(buf: integer): boolean) return false to disable attaching
			})
		end,
	},
	{
		"nvim-treesitter/playground",
		cmd = { "TSPlaygroundToggle" },
	},
	{
		"nvim-treesitter/nvim-treesitter-textobjects",
		branch = "main",
		init = function()
			-- Disable entire built-in ftplugin mappings to avoid conflicts.
			-- See https://github.com/neovim/neovim/tree/master/runtime/ftplugin for built-in ftplugins.
			vim.g.no_plugin_maps = true

			-- Or, disable per filetype (add as you like)
			-- vim.g.no_python_maps = true
			-- vim.g.no_ruby_maps = true
			-- vim.g.no_rust_maps = true
			-- vim.g.no_go_maps = true
		end,
		config = function()
			-- put your config here
		end,
	},
	{
		"Wansmer/sibling-swap.nvim",
		lazy = true,
		event = { "BufReadPre", "BufNewFile" },
		config = function()
			require("sibling-swap").setup({
				allowed_separators = {
					",",
					";",
					"and",
					"or",
					"&&",
					"&",
					"||",
					"|",
					"==",
					"===",
					"!=",
					"!==",
					"-",
					"+",
					["<"] = ">",
					["<="] = ">=",
					[">"] = "<",
					[">="] = "<=",
				},
				use_default_keymaps = false,
			})

			vim.keymap.set("n", "<leader>N", "<Nop>", { desc = "Swap Previous" })
			vim.keymap.set("n", "<leader>n", "<Nop>", { desc = "Swap Next" })

			function gWrapper(opfunc)
				vim.go.operatorfunc = opfunc
				return "g@l"
			end

			_G.swap_with_left = function()
				vim.go.operatorfunc = "v:lua.require'sibling-swap'.swap_with_left"
				return "g@l"
			end

			_G.swap_with_right = function()
				vim.go.operatorfunc = "v:lua.require'sibling-swap'.swap_with_right"
				return "g@l"
			end

			vim.keymap.set("n", "<space>ns", swap_with_right, { expr = true, desc = "a list/comparison/property" })
			vim.keymap.set("n", "<space>Ns", swap_with_left, { expr = true, desc = "a list/comparison/property" })
		end,
	},
}
