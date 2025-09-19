return {
    "seblyng/roslyn.nvim",
    ---@module 'roslyn.config'
    ---@type RoslynNvimConfig
    opts = {},
    config = function()
        require("roslyn").setup()
        vim.lsp.config("roslyn", {
        })
    end
}
