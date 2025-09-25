return {
	"williamboman/mason.nvim",
	-- lazy = true,
	dependencies = {
		"mason-org/mason-lspconfig.nvim",
		"WhoIsSethDaniel/mason-tool-installer.nvim",
	},
	config = function()
		local mason = require("mason")
		local mason_lspconfig = require("mason-lspconfig")
		local mason_tool_installer = require("mason-tool-installer")

		mason.setup({
			ui = {
				icons = {
					package_installed = "✓",
					package_pending = "➜",
					package_uninstalled = "✗",
				},
			},
		})

		mason_lspconfig.setup({
			ensure_installed = {
				"ts_ls",
				"rust_analyzer",
				"lua_ls",
				"nil_ls",
				"terraformls",
				"basedpyright",
			},

			-- automatic_installation = true, -- Automatically run vim.lsp.enable()
		})

		mason_tool_installer.setup({
			ensure_installed = {
				-- Formatters
				"prettier", -- Javascript et al
				"stylua", -- Lua
				"alejandra", -- Nix

				"ruff", -- Python
				"shfmt", -- Shell

				-- Linters
				"eslint_d", -- Javascript et al
				"shellcheck", -- Shell
			},
		})
	end,
}
