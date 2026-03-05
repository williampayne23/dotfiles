return {
	"neovim/nvim-lspconfig",
	branch = "master",
	lazy = false,
	build = ":TSUpdate", -- Update tree-sitter parsers
	event = { "BufReadPre", "BufNewFile" },
	opts = {
		servers = {
			basedpyright = {
				capabilities = {},
				on_init = function(client)
					-- Only keep code actions and semantic tokens from basedpyright.
					client.server_capabilities.completionProvider = nil
					client.server_capabilities.hoverProvider = nil
					client.server_capabilities.signatureHelpProvider = nil
					client.server_capabilities.referencesProvider = nil
					client.server_capabilities.renameProvider = nil
					client.server_capabilities.definitionProvider = nil
					client.server_capabilities.documentHighlightProvider = nil
				end,
			},
			pyright = {
				on_init = function(client)
					-- Pyright handles completions, diagnostics, hover, go-to-def, etc.
					-- Disable code actions and semantic tokens (basedpyright handles those).
					client.server_capabilities.codeActionProvider = nil
					client.server_capabilities.semanticTokensProvider = nil
				end,
			},
			lua_ls = {},
			ts_ls = {},
			nil_ls = {},
			yamlls = {},
			terraformls = {},
			rust_analyzer = {},
		},
	},
	config = function(_, opts)
		-- Use to enable autocompletion
		local blink = require("blink.cmp")

		for server, config in pairs(opts.servers) do
			vim.lsp.enable(server)
			if server ~= "basedpyright" then
				config.capabilities = blink.get_lsp_capabilities(config.capabilities)
			end
			vim.lsp.config(server, config)
		end

		vim.diagnostic.config({
			update_in_insert = false,
			severity_sort = true,
			virtual_text = { spacing = 2 },
		})

		-- Disable diagnostics specifically for basedpyright, since it only provides code actions and semantic tokens.
		-- This is necessary because basedpyright is very very slow! Annoyingly it still sends diagnostics so it's still
		-- Slow but at least I don't have to see them
		vim.api.nvim_create_autocmd("LspAttach", {
			group = vim.api.nvim_create_augroup("basedpyright_no_diag", {}),
			callback = function(args)
				local client = vim.lsp.get_client_by_id(args.data.client_id)
				if client and client.name == "basedpyright" then
					local ns = vim.lsp.diagnostic.get_namespace(client.id)
					vim.diagnostic.enable(false, { ns_id = ns, bufnr = args.buf })
				end
			end,
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
