return {
	"stevearc/conform.nvim",
	event = { "BufReadPre", "BufNewFile" },
	config = {
		formatters_by_ft = {
			sh = { "shfmt" },
			bash = { "shfmt" },
			zsh = { "shfmt" },

			nix = { "alejandra" },
			lua = { "stylua" },
			python = { "ruff_fix", "ruff_format" },

			javascript = { "prettier" },
			typescript = { "prettier" },

			css = { "prettier" },
			html = { "prettier" },

			json = { "prettier" },
			yaml = { "prettier" },
			markdown = { "prettier" },
		},
		format_on_save = {
			lsp_fallback = true,
			async = false,
			timeout_ms = 1000,
		},
	},
}
