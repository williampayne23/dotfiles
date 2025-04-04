return {
    'nvim-tree/nvim-tree.lua',
    opts = {
        view = {
            float = {
                enable = true,
                open_win_config = function()
                    local screen_w = vim.opt.columns:get()
                    local screen_h = vim.opt.lines:get() - vim.opt.cmdheight:get()
                    local window_w = screen_w * 0.7
                    local window_h = screen_h * 0.7
                    local window_w_int = math.floor(window_w)
                    local window_h_int = math.floor(window_h)
                    local center_x = (screen_w - window_w) / 2
                    local center_y = ((vim.opt.lines:get() - window_h) / 2)
                        - vim.opt.cmdheight:get()
                    return {
                        border = 'rounded',
                        relative = 'editor',
                        row = center_y,
                        col = center_x,
                        width = window_w_int,
                        height = window_h_int,
                    }
                end,
            },
            width = function()
                return math.floor(vim.opt.columns:get() * 0.7)
            end,
        },

    },
    keys = {
        { "<leader>pv", function() vim.cmd('NvimTreeFindFile') end, desc = "open file tree" },
        {
            "<Esc>",
            function()
                require("nvim-tree.api").tree.close()
            end,
            desc = "close file tree"
        },

    }
}
