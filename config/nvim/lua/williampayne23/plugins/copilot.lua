local provider = nil

if williampayne23.is_aisi_machine() then
	provider = "claude-proxy"
else
	provider = "copilot"
end

return {
	{
		"zbirenbaum/copilot.lua",
		event = "InsertEnter",
		keys = {
			{
				"<Right>",
				function()
					local cursorCol = vim.fn.col(".")
					if require("copilot.suggestion").is_visible() then
						-- if cursorCol == vim.fn.col("$") then
						require("copilot.suggestion").accept()
					else
						vim.cmd(string.format(":call cursor(%d, %d)", vim.fn.line("."), cursorCol + 1))
					end
				end,
				mode = "i",
				desc = "Accept Copilot suggestion",
				silent = true,
			},
		},
		main = "copilot",
		opts = {
			suggestion = {
				auto_trigger = true,
			},
		},
	},
	{
		"yetone/avante.nvim",
		event = "InsertEnter",
		config = {
			provider = provider,
			providers = {
				["openai_proxy"] = {
					__inherited_from = "openai",
					endpoint = vim.env.OPENAI_BASE_URL,
					model = "gpt-5",
					api_key_name = "OPENAI_RAW_API_KEY", -- environment variable name for your OpenAI API key
				},
				["claude-proxy"] = {
					__inherited_from = "claude",
					endpoint = "https://anthropic-proxy.i.apps.ai-safety-institute.org.uk",
					model = "claude-sonnet-4-0",
					api_key_name = "ANTHROPIC_RAW_API_KEY",
				},
			},
			mappings = {
				focus = "<leader>aq",
				files = {
					add_current = "<leader>af",
				},
			},
			system_prompt = function()
				local hub = require("mcphub").get_hub_instance()
				return hub and hub:get_active_servers_prompt() or ""
			end,
			-- Using function prevents requiring mcphub before it's loaded
			custom_tools = function()
				return {
					require("mcphub.extensions.avante").mcp_tool(),
				}
			end,
		},
		keys = {
			{ "<leader>ac", "<cmd>AvanteClear<CR>", mode = "n", silent = true, desc = "Clear Chat" },
			{ "<leader>a", "<Nop>", mode = "n", desc = "Avante" },
		},
		-- if you want to build from source then do `make BUILD_FROM_SOURCE=true`
		build = "make",
		-- build = "powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false" -- for windows
		dependencies = {
			"nvim-treesitter/nvim-treesitter",
			"stevearc/dressing.nvim",
			"nvim-lua/plenary.nvim",
			"MunifTanjim/nui.nvim",
			--- The below dependencies are optional,
			"hrsh7th/nvim-cmp", -- autocompletion for avante commands and mentions
			"zbirenbaum/copilot.lua", -- for providers='copilot'
			{
				-- Make sure to set this up properly if you have lazy=true
				"MeanderingProgrammer/render-markdown.nvim",
				opts = {
					file_types = { "markdown", "Avante" },
					code = {
						highlight_info = "FloatNormal",
						highlight = "FloatNormal",
						highlight_fallback = "FloatNormal",
						style = "normal",
					},
				},
				ft = { "markdown", "Avante" },
			},
			{
				"ravitemer/mcphub.nvim",
				dependencies = {
					"nvim-lua/plenary.nvim",
				},
				config = {
					extensions = {
						avante = {
							make_slash_commands = true,
						},
					},
				},
			},
		},
	},
}
