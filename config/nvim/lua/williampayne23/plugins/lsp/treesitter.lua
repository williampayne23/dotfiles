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
			{ "nvim-treesitter/nvim-treesitter-textobjects", lazy = true },
			{ "Wansmer/sibling-swap.nvim", lazy = true },
		},
		lazy = true,
		build = ":TSUpdate",
		event = { "BufReadPre", "BufNewFile" },
		config = function(_, _)
			local treesitter = require("nvim-treesitter.configs")

			treesitter.setup({
				-- A list of parser names, or "all" (the five listed parsers should always be installed)
				ensure_installed = {
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
				},
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

				highlight = {
					enable = true,

					-- Setting this to true will run `:h syntax` and tree-sitter at the same time.
					-- Set this to `true` if you depend on 'syntax' being enabled (like for indentation).
					-- Using this option may slow down your editor, and you may see some duplicate highlights.
					-- Instead of true it can also be a list of languages
					additional_vim_regex_highlighting = false,
				},
				indent = {
					enable = true,
				},
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
		lazy = true,
		event = { "BufReadPre", "BufNewFile" },
		config = function()
			require("nvim-treesitter.configs").setup({
				textobjects = {
					select = {
						enable = true,

						-- Automatically jump forward to textobj, similar to targets.vim
						lookahead = true,

						keymaps = {
							-- You can use the capture groups defined in textobjects.scm
							["a="] = { query = "@assignment.outer", desc = "an assignment" },
							["i="] = { query = "@assignment.inner", desc = "an assignment" },
							["=l"] = { query = "@assignment.lhs", desc = "left hand side of an assignment" },
							["=r"] = { query = "@assignment.rhs", desc = "right hand side of an assignment" },

							["aS"] = { query = "@statement.outer", desc = "a statement" },

							["aa"] = { query = "@parameter.outer", desc = "a parameter/argument" },
							["ia"] = { query = "@parameter.inner", desc = "a parameter/argument" },

							["ai"] = { query = "@conditional.outer", desc = "a conditional" },
							["ii"] = { query = "@conditional.inner", desc = "a conditional" },

							["al"] = { query = "@loop.outer", desc = "a loop" },
							["il"] = { query = "@loop.inner", desc = "a loop" },

							["af"] = { query = "@call.outer", desc = "a function call" },
							["if"] = { query = "@call.inner", desc = "a function call" },

							["aF"] = { query = "@function.outer", desc = "a method/function definition" },
							["iF"] = { query = "@function.inner", desc = "a method/function definition" },

							["ac"] = { query = "@class.outer", desc = "a class" },
							["ic"] = { query = "@class.inner", desc = "a class" },
						},
					},
					swap = {
						enable = true,
						swap_next = {
							["<leader>na"] = { query = "@parameter.inner", desc = "a parameter/argument" },
							["<leader>ni"] = { query = "@conditional.inner", desc = "a conditional" },
							["<leader>nf"] = { query = "@call.outer", desc = "a function call" },
							["<leader>nF"] = { query = "@function.outer", desc = "a method/function definition" },
							["<leader>nc"] = { query = "@class.outer", desc = "a class" },
						},
						swap_previous = {
							["<leader>Na"] = { query = "@parameter.inner", desc = "a parameter/argument" },
							["<leader>Ni"] = { query = "@conditional.inner", desc = "a conditional" },
							["<leader>Nf"] = { query = "@call.outer", desc = "a function call" },
							["<leader>NF"] = { query = "@function.outer", desc = "a method/function definition" },
							["<leader>Nc"] = { query = "@class.outer", desc = "a class" },
						},
					},
					move = {
						enable = true,
						set_jumps = true, -- whether to set jumps in the jumplist
						goto_next_start = {
							["]F"] = { query = "@function.outer", desc = "Next function start" },
							["]="] = { query = "@assignment.lhs", desc = "Next assignment" },
							["]c"] = { query = "@class.outer", desc = "Next class start" },
							["]l"] = { query = "@loop.*", desc = "Next loop start" },
							["]s"] = { query = "@scope", desc = "Next scope" },
							["]z"] = { query = "@fold", query_group = "folds", desc = "Next fold" },
							["]i"] = { "@conditional.outer", desc = "Next conditional start" },
						},
						goto_previous_start = {
							["[F"] = { query = "@function.outer", desc = "Previous function start" },
							["[="] = { query = "@assignment.lhs", desc = "Previous assignment" },
							["[c"] = { query = "@class.outer", desc = "Previous class start" },
							["[l"] = { query = "@loop.*", desc = "Previous loop start" },
							["[s"] = { query = "@scope", desc = "Previous scope" },
							["[z"] = { query = "@fold", query_group = "folds", desc = "Previous fold" },
							["[i"] = { "@conditional.outer", desc = "Previous conditional start" },
						},
					},
				},
			})
			local ts_repeat_move = require("nvim-treesitter.textobjects.repeatable_move")

			-- Repeat movement with ; and ,
			-- ensure ; goes forward and , goes backward regardless of the last direction
			vim.keymap.set({ "n", "x", "o" }, ";", ts_repeat_move.repeat_last_move_next)
			vim.keymap.set({ "n", "x", "o" }, ",", ts_repeat_move.repeat_last_move_previous)

			-- vim way: ; goes to the direction you were moving.
			-- vim.keymap.set({ "n", "x", "o" }, ";", ts_repeat_move.repeat_last_move)
			-- vim.keymap.set({ "n", "x", "o" }, ",", ts_repeat_move.repeat_last_move_opposite)

			-- Optionally, make builtin f, F, t, T also repeatable with ; and ,
			vim.keymap.set({ "n", "x", "o" }, "f", ts_repeat_move.builtin_f)
			vim.keymap.set({ "x", "n", "o" }, "F", ts_repeat_move.builtin_F)
			vim.keymap.set({ "n", "x", "o" }, "t", ts_repeat_move.builtin_t)
			vim.keymap.set({ "n", "x", "o" }, "T", ts_repeat_move.builtin_T)
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
