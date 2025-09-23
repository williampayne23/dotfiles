return {
	"neovim/nvim-lspconfig",
	branch = "master",
	lazy = false,
	build = ":TSUpdate", -- Update tree-sitter parsers
	event = { "BufReadPre", "BufNewFile" },
	opts = {
		servers = {
			basedpyright = {
				settings = {
					basedpyright = {
						analysis = {
							typeCheckingMode = "basic", -- or "basic"/"off" if you want lighter
						},
					},
				},
			},
		},
	},
	config = function(_, opts)
		-- Use to enable autocompletion
		local blink = require("blink.cmp")

		for server, config in pairs(opts.servers) do
			vim.lsp.enable(server)
			config.capabilities = blink.get_lsp_capabilities(config.capabilities)
			vim.lsp.config(server, config)
		end

		vim.diagnostic.config({
			update_in_insert = false,
			severity_sort = true,
			virtual_text = { spacing = 2 },
		})

		-- Keymaps, see :h lsp-attach
		vim.api.nvim_create_autocmd("LspAttach", {
			group = vim.api.nvim_create_augroup("my.lsp", {}),
			callback = function(_args)
				vim.keymap.set("n", "gd", function()
					vim.lsp.buf.definition()
				end, { desc = "Go To Definition" })
				vim.keymap.set("n", "<leader>vd", function()
					vim.diagnostic.open_float()
				end, { desc = "Open Diagonistic Float" })
				vim.keymap.set("n", "]d", function()
					vim.diagnostic.goto_next()
				end, { desc = "Next Diagnostic" })
				vim.keymap.set("n", "[d", function()
					vim.diagnostic.goto_prev()
				end, { desc = "Previous Diagnostic" })
				vim.keymap.set("n", "<leader>va", function()
					vim.lsp.buf.code_action()
				end, { desc = "Show Code Actions" })
				vim.keymap.set("n", "<leader>vR", function()
					vim.lsp.buf.references()
				end, { desc = "Show References" })
				vim.keymap.set("n", "<leader>vr", function()
					vim.lsp.buf.rename()
				end, { desc = "Rename" })
				vim.keymap.set("i", "<C-h>", function()
					vim.lsp.buf.signature_help()
				end, { desc = "Help" })
				vim.keymap.set({ "n" }, "<leader>f", "<cmd>lua vim.lsp.buf.format({async = true})<cr>", {
					desc = "Format Buffer",
				})
				vim.keymap.set({ "n", "x" }, "<leader>pr", function()
					Snacks.picker.lsp_references()
				end, { desc = "Find References" })
				vim.keymap.set({ "n", "x" }, "<leader>v", "<Nop>", { desc = "LSP" })
			end,
		})
	end,
}
