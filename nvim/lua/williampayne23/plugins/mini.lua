return {
    {
        'echasnovski/mini.nvim',
        version = '*',
        config = function()
            local gen_spec = require('mini.ai').gen_spec
            require('mini.ai').setup({
                custom_textobjects = {
                    -- Tweak argument to be recognized only inside `()` between `;`
                    a = gen_spec.argument({ brackets = { '%b()' }, separator = ';' }),

                    -- Tweak function call to not detect dot in function name
                    f = gen_spec.function_call({ name_pattern = '[%w_]' }),

                    -- Function definition (needs treesitter queries with these captures)
                    F = gen_spec.treesitter({ a = '@function.outer', i = '@function.inner' }),

                    -- Make `|` select both edges in non-balanced way
                    ['|'] = gen_spec.pair('|', '|', { type = 'non-balanced' }),
                }
            })
            require('mini.surround').setup({
                -- configuration here, or leave empty to use defaults
            })
        end
    }
}
