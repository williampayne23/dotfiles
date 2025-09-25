return {
	"lommix/bevy_inspector.nvim",
	dependencies = {
		{
			"nvim-telescope/telescope.nvim",
			lazy = true,
		},
		"nvim-lua/plenary.nvim",
	},
	ft = { "rst" },
	config = true,
	cmd = { "BevyInspect", "BevyInspectNamed", "BevyInspectQuery" },
	keys = {
		{ "<leader>bia", ":BevyInspect<Cr>", desc = "Lists all entities" },
		{ "<leader>bin", ":BevyInspectNamed<Cr>", desc = "List all named entities" },
		{
			"<leader>biq",
			":BevyInspectQuery<Cr>",
			desc = "Query a single component, continues to list all matching entities",
		},
	},
}
