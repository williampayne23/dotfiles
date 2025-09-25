vim.api.nvim_create_user_command("FormatDisable", function(args)
	if args.bang then
		-- :FormatDisable! disables autoformat for this buffer only
		vim.b.disable_autoformat = true
	else
		-- :FormatDisable disables autoformat globally
		vim.g.disable_autoformat = true
	end
end, {
	desc = "Disable autoformat-on-save",
	bang = true, -- allows the ! variant
})

vim.api.nvim_create_user_command("FormatEnable", function()
	vim.b.disable_autoformat = false
	vim.g.disable_autoformat = false
end, {
	desc = "Re-enable autoformat-on-save",
})

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
		format_on_save = function(bufnr)
			if vim.g.disable_autoformat or vim.b[bufnr].disable_autoformat then
				return
			end
			local disable_filetypes = { c = false, cpp = false }
			return {
				timeout_ms = 1000,
				lsp_fallback = not disable_filetypes[vim.bo[bufnr].filetype],
			}
		end,
	},
}
