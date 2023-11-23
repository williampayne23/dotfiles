return {
  {
	  'nvim-telescope/telescope.nvim', tag = '0.1.4',
	  dependencies = { 'nvim-lua/plenary.nvim' },
	  config = function(_, _)
		  local builtin = require('telescope.builtin')
		  vim.keymap.set('n', '<leader>pf', builtin.find_files, {})
		  vim.keymap.set('n', '<leader>pg', builtin.git_files, {})
		  vim.keymap.set('n', '<leader>ps', builtin.live_grep, {})
          vim.keymap.set('n', '<leader>pb', builtin.buffers, {})
		  vim.keymap.set('n', '<leader>fh', builtin.help_tags, {})
	  end
  },
}
