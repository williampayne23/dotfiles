-- For some reason setting mouse normally doesn't work
-- I assume it's a plugin that's overriding it
-- so this is a workaround (it's real I checked)
vim.api.nvim_create_autocmd("user", {
    pattern = "lazyvimstarted",
    once = true,
    callback = function()
        vim.cmd "set mouse=a"
    end,
})


vim.api.nvim_create_autocmd("BufReadPost", {
    pattern = "*.tmux.conf",
    callback = function()
        vim.cmd "set syntax=tmux"
    end,
})


vim.api.nvim_create_autocmd("BufEnter", {
    pattern = "NeogitStatus",
    callback = function()
        vim.api.nvim_create_autocmd("BufEnter", {
            pattern = "quit_nvim",
            callback = function()
                if (vim.v.argv[3] == "+Neogit") then
                    vim.cmd("quitall")
                end
            end,
        })
    end,
})

vim.opt.number = true
vim.opt.signcolumn = "number"
vim.opt.relativenumber = true

vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true


-- vim.opt.wrap = true

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
vim.opt.undofile = true


vim.opt.hlsearch = false
vim.opt.incsearch = true

vim.opt.termguicolors = true

vim.opt.scrolloff = 88
vim.opt.signcolumn = "yes"
vim.opt.isfname:append("@-@")

vim.opt.updatetime = 50

vim.opt.colorcolumn = "88"
vim.opt.textwidth = 0
vim.opt.wrap = true
vim.opt.wrapmargin = 0
vim.api.nvim_create_autocmd("User", {
    pattern = "BufRead,BufNewFile",
    once = false,
    callback = function()
        vim.opt.textwidth = 0
        vim.opt.wrapmargin = 0
    end,
})

vim.g.mapleader = " "
-- vim.cmd ":autocmd WinNew * wincmd L"
vim.cmd ":autocmd FileType help wincmd L"
