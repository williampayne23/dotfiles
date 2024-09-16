return {
    'ixru/nvim-markdown',
    'leissa/vim-acme',
    { 'lvimuser/lsp-inlayhints.nvim',
    config = function()
        require("lsp-inlayhints").setup()
        vim.api.nvim_create_augroup("LspAttach_inlayhints", {})
        vim.api.nvim_create_autocmd("LspAttach", {
            group = "LspAttach_inlayhints",
            callback = function(args)
                if not (args.data and args.data.client_id) then
                    return
                end

                local bufnr = args.buf
                local client = vim.lsp.get_client_by_id(args.data.client_id)
                require("lsp-inlayhints").on_attach(client, bufnr)
            end,
        })
    end
},
    {
        "christoomey/vim-tmux-navigator",
        lazy = false,
        cmd = {
            "TmuxNavigateLeft",
            "TmuxNavigateDown",
            "TmuxNavigateUp",
            "TmuxNavigateRight",
            "TmuxNavigatePrevious",
        },
        keys = {
            { "˙", "<cmd>TmuxNavigateLeft<cr>" },
            { "∆", "<cmd>TmuxNavigateDown<cr>" },
            { "˚", "<cmd>TmuxNavigateUp<cr>" },
            { "¬", "<cmd>TmuxNavigateRight<cr>" },
            { "«", "<cmd>TmuxNavigatePrevious<cr>" },
        },
    },
'ThePrimeagen/vim-be-good',
{
    "folke/persistence.nvim",
    event = "BufReadPre", -- this will only start session saving when an actual file was opened
    opts = {
        -- add any custom options here
    }
},
{ "catppuccin/nvim", name = "catppuccin", priority = 1000 },
'eandrju/cellular-automaton.nvim',
{
    "kawre/leetcode.nvim",
    build = ":TSUpdate html",
    dependencies = {
        "nvim-telescope/telescope.nvim",
        "nvim-lua/plenary.nvim", -- required by telescope
        "MunifTanjim/nui.nvim",

        -- optional
        "nvim-treesitter/nvim-treesitter",
        -- "rcarriga/nvim-notify",
        "nvim-tree/nvim-web-devicons",
    },
    opts = {
        -- configuration goes here
        lang = "python",
        logging = false,
        description = {
            position = "left", ---@type "top" | "right" | "bottom" | "left"

            width = "90%", ---@type string | integer
        },
        hooks = {
            LeetEnter = { function()
                vim.keymap.set("n", "<leader>lt", "<cmd>Leet test<CR>")
                vim.keymap.set("n", "<leader>ll", "<cmd>Leet menu<CR>")
                vim.keymap.set("n", "<leader>ld", "<cmd>Leet desc<CR>")
                vim.keymap.set("n", "<leader>li", "<cmd>Leet info<CR>")
                vim.keymap.set("n", "<leader>lr", "<cmd>Leet submit<CR>")
            end }
        }
    },
}
}
