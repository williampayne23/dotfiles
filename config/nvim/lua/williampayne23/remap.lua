vim.keymap.set("i", "<A-3>", "#")

vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv", {desc = "move down"})
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv", {desc = "move up"})

vim.keymap.set("n", "J", "mzJ`z")
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")

vim.keymap.set("x", "<leader>p", "\"_dP", {desc = "keep reg and paste"})

vim.keymap.set("n", "<leader>y", "\"+y", {desc = "yank to clipboard"})
vim.keymap.set("v", "<leader>y", "\"+y", {desc = "yank to clipboard"})

vim.keymap.set("n", "<leader>d", "\"_d", {desc = "delete to null"})
vim.keymap.set("v", "<leader>d", "\"_d", {desc = "delete to null"})

vim.keymap.set("n", "Q", "<nop>")
vim.keymap.set("n", "Q", "@q", {desc = "replay q macro"})

vim.keymap.set("n", "<leader>s", "<cmd>lua Scratch()<CR>", {desc = "scratch"})
vim.keymap.set("v", "<leader>f", "<cmd>lua FlipAround()<CR>", {desc = "Flip around ,"})

vim.keymap.set("n", "<leader>q", "<cmd>q<CR>", {desc = "close window"})

-- Exit terminal
vim.keymap.set("t", "<Esc>", "<C-\\><C-n>")

vim.keymap.set("n", "<leader>f", function()
    vim.lsp.buf.format()
end, {desc = "format"})


-- vim.keymap.set("n", "<C-k>", "<cmd>cnext<CR>zz")
-- vim.keymap.set("n", "<C-j>", "<cmd>cprev<CR>zz")
vim.keymap.set("n", "<leader>k", "<cmd>cnext<CR>zz", {desc = "quickfix next"})
vim.keymap.set("n", "<leader>j", "<cmd>cprev<CR>zz", {desc = "quickfix prev"})

vim.keymap.set("n", "<leader>S", [[:%s/\<<C-r><C-w>\>/<C-r><C-w>/gI<Left><Left><Left>]], {desc = "replace word in file"})
vim.keymap.set("n", "<leader>x", "<cmd>!chmod +x %<CR>", { silent = true, desc="make executable" })

-- Newlines
vim.keymap.set("n", "<leader>o", 'o<Esc>0"_Dk', {desc = "newline below"})
vim.keymap.set("n", "<leader>O", 'O<Esc>0"_Dj', {desc = "newline above"})

vim.keymap.set("n", "<C-w>|", "<cmd>vsplit<CR>", {desc = "Vertical split"})
vim.keymap.set("n", "<C-w>-", "<cmd>split<CR>", {desc = "Horizontal split"})


-- To keep cursor in the center of the screen. Not sure if I like it though because it can flicker
-- vim.api.nvim_create_autocmd({ "CursorMoved" }, {
--   callback = function()
--     -- normal buffer (not terminal or prompt)
--     if vim.bo.buftype ~= "" then
--       return
--     end
--
--     vim.api.nvim_input("zz")
--
--   end,
-- })
--

vim.keymap.set("n", "|", ":%!", {desc = "pipe"})
vim.keymap.set("v", "|", ":%!", {desc = "pipe"})

