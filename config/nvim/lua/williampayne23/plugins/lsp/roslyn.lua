return {
	"seblyng/roslyn.nvim",
	---@module 'roslyn.config'
	---@type RoslynNvimConfig
	opts = {},
	ft = { "cs", "vb" },
	config = function()
		require("roslyn").setup()
		vim.lsp.config("roslyn", {})
	end,
}
