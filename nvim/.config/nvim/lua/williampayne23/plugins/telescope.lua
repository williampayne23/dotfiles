return {
  {
	  'nvim-telescope/telescope.nvim', tag = '0.1.4',
	  dependencies = { 'nvim-lua/plenary.nvim' },
	  config = function(_, _)
		  local builtin = require('telescope.builtin')
		  vim.keymap.set('n', '<leader>pf', builtin.find_files, { desc = "find files" })
		  vim.keymap.set('n', '<leader>pg', builtin.git_files, { desc = "find git files" })
		  vim.keymap.set('n', '<leader>ps', builtin.live_grep, { desc = "grep files" })
          vim.keymap.set('n', '<leader>pb', builtin.buffers, { desc = "find buffers" })
		  vim.keymap.set('n', '<leader>fh', builtin.help_tags, { desc = "find help" })
          local wk = require("which-key")
            wk.register({
                p = {
                    name = "project",
                    f = "find files"
                }
            }, {prefix = "<leader>"})
	  end
  },
}
