vim.keymap.set("i", "<A-3>", "#")

vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv", { desc = "Move Down" })
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv", { desc = "Move Up" })

vim.keymap.set("n", "J", "mzJ`z")
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")

vim.keymap.set("x", "<leader>p", '"_dP', { desc = "Keep Reg and Paste" })

vim.keymap.set("n", "<leader>y", '"+y', { desc = "Yank To Clipboard" })
vim.keymap.set("v", "<leader>y", '"+y', { desc = "Yank To Clipboard" })

vim.keymap.set("n", "<leader>d", '"_d', { desc = "Delete To Null" })
vim.keymap.set("v", "<leader>d", '"_d', { desc = "Delete To Null" })

vim.keymap.set("n", "Q", "<nop>")
vim.keymap.set("n", "Q", "@q", { desc = "Replay q Macro" })

vim.keymap.set("v", "<leader>f", "<cmd>lua FlipAround()<CR>", { desc = "Flip Around" })

vim.keymap.set("n", "<leader>q", "<cmd>q<CR>", { desc = "Close Window" })

-- Exit terminal
vim.keymap.set("t", "<Esc>", "<C-\\><C-n>")

vim.keymap.set("n", "<leader>k", "<cmd>cnext<CR>zz", { desc = "Quickfix Next" })
vim.keymap.set("n", "<leader>j", "<cmd>cprev<CR>zz", { desc = "Quickfix Prev" })

vim.keymap.set(
	"n",
	"<leader>S",
	[[:%s/\<<C-r><C-w>\>/<C-r><C-w>/gI<Left><Left><Left>]],
	{ desc = "Replace Word in File" }
)
vim.keymap.set("n", "<leader>x", "<cmd>!chmod +x %<CR>", { silent = true, desc = "Make Executable" })

-- Newlines
vim.keymap.set("n", "<leader>o", 'o<Esc>0"_Dk', { desc = "Newline Below" })
vim.keymap.set("n", "<leader>O", 'O<Esc>0"_Dj', { desc = "Newline Above" })

vim.keymap.set("n", "<C-w>|", "<cmd>vsplit<CR>", { desc = "Vertical Split" })
vim.keymap.set("n", "<C-w>-", "<cmd>split<CR>", { desc = "Horizontal Split" })

vim.keymap.set("n", "|", ":%!", { desc = "Pipe" })
vim.keymap.set("v", "|", ":%!", { desc = "Pipe" })

-- More convenient indenting
vim.keymap.set("v", ">>", ">gv", { desc = "Indent Right" })
vim.keymap.set("v", "<<", "<gv", { desc = "Indent Left" })
