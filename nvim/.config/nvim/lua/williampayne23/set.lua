-- For some reason setting mouse normally doesn't work
-- I assume it's a plugin that's overriding it
-- so this is a workaround
vim.api.nvim_create_autocmd("User", {
    pattern = "LazyVimStarted",
    once = true,
    callback = function()
        vim.cmd "set mouse=a"
        vim.notify(vim.v.argv[1])
end,
})


vim.api.nvim_create_autocmd("User", {
    pattern = "GUIEnter",
    once = true,
    callback = function()
        vim.notify(vim.v.argv[0])
end,
})

vim.opt.number = true
vim.opt.signcolumn = "number"
vim.opt.relativenumber = true

vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

vim.opt.wrap = false

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
vim.opt.undofile = true


vim.opt.hlsearch = false
vim.opt.incsearch = true

vim.opt.termguicolors = true

vim.opt.scrolloff = 100
vim.opt.signcolumn = "yes"
vim.opt.isfname:append("@-@")

vim.opt.updatetime = 50

vim.g.mapleader = " "
-- vim.cmd ":autocmd WinNew * wincmd L"
vim.cmd ":autocmd FileType help wincmd L"
