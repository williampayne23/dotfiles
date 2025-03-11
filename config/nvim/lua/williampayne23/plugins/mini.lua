return {
    {
        'echasnovski/mini.nvim',
        version = '*',
        config = function()
            -- local gen_spec = require('mini.ai').gen_spec
            -- require('mini.ai').setup({
            --     custom_textobjects = {
            --         -- Tweak argument to be recognized only inside `()` between `;`
            --         a = gen_spec.argument({ brackets = { '%b()' }, separator = ';' }),
            --
            --         -- Tweak function call to not detect dot in function name
            --         f = gen_spec.function_call({ name_pattern = '[%w_]' }),
            --
            --         -- Function definition (needs treesitter queries with these captures)
            --         F = gen_spec.treesitter({ a = '@function.outer', i = '@function.inner' }),
            --
            --         -- Make `|` select both edges in non-balanced way
            --         ['|'] = gen_spec.pair('|', '|', { type = 'non-balanced' }),
            --     }
            -- })
            require('mini.surround').setup({
                -- configuration here, or leave empty to use defaults
            })

            require('mini.diff').setup({
                view = {
                    -- Visualization style. Possible values are 'sign' and 'number'.
                    -- Default: 'number' if line numbers are enabled, 'sign' otherwise.
                    style = 'sign',

                    -- Signs used for hunks with 'sign' view
                    signs = { add = '┃', change = '┃', delete = '┃' },

                    -- Priority of used visualization extmarks
                    priority = -1,
                },
            })

            -- local wk = require "which-key"
            -- wk.register({
            --     ["aF"] = [[a function]],
            --     ["iF"] = [[a function]],
            --     ["af"] = [[a function call]],
            --     ["if"] = [[a function call]],
            --     ["aa"] = [[next argument]],
            --     ["ia"] = [[next argument]],
            --     ["a|"] = [[surrounding |]],
            --     ["i|"] = [[surrounding |]],
            --
            -- }, {mode="o", prefix = ""})
        end
    }
}
