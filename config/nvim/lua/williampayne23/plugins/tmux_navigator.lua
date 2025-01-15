return {
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
    }
}
