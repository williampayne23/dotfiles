return {
    {
        'nvim-telescope/telescope.nvim',
        tag = '0.1.4',
        dependencies = { 'nvim-lua/plenary.nvim' },
        config = function(_, _)
            local builtin = require('telescope.builtin')
            vim.keymap.set('n', '<leader>pf', builtin.find_files, { desc = "find files" })
            vim.keymap.set('n', '<leader>pg', builtin.git_files, { desc = "find git files" })
            vim.keymap.set('n', '<leader>ps', builtin.live_grep, { desc = "grep files" })
            vim.keymap.set('n', '<leader>pb', builtin.buffers, { desc = "find buffers" })
            vim.keymap.set('n', '<leader>ph', builtin.help_tags, { desc = "find help" })
            local wk = require("which-key")
            wk.add({
                { "<leader>p", group = "search" },
            });
            require('telescope').setup {
                defaults = {
                    mappings = {
                        i = {
                            ["<C-Q>"] = require('telescope.actions').send_selected_to_qflist + require('telescope.actions').open_qflist
                        },
                        n = {
                            ["<C-Q>"] = require('telescope.actions').send_selected_to_qflist + require('telescope.actions').open_qflist
                        },
                    },
                    vimgrep_arguments = {
                        'rg',
                        '--color=never',
                        '--no-heading',
                        '--with-filename',
                        '--line-number',
                        '--column',
                        '--smart-case',
                    }
                }
            }
        end
    },
}
