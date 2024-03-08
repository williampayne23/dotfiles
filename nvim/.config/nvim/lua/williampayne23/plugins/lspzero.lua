return {
    {
        'VonHeikemen/lsp-zero.nvim',
        dependencies = {
            'neovim/nvim-lspconfig',
            'williamboman/mason.nvim',
            'williamboman/mason-lspconfig.nvim',
            -- Autocompletion
            'hrsh7th/nvim-cmp',
            'hrsh7th/cmp-buffer',
            'hrsh7th/cmp-path',
            'hrsh7th/cmp-cmdline',
            'saadparwaiz1/cmp_luasnip',
            'hrsh7th/cmp-nvim-lsp',
            'hrsh7th/cmp-nvim-lua',

            -- Snippets
            'L3MON4D3/LuaSnip',

            'rcarriga/nvim-dap-ui',
            'mfussenegger/nvim-dap',
            'folke/neodev.nvim',
            'jose-elias-alvarez/null-ls.nvim',
        },
        branch = 'v3.x',
        config = function()
            -- Ensure that the required plugins are installed
            local status, neodev = pcall(require, 'neodev')
            if not status then
                vim.cmd.echom('error')
                return
            end
            local lsp
            status, lsp = pcall(require, 'lsp-zero')
            if not status then
                vim.cmd.echom('error')
                return
            end
            neodev.setup({
                -- add any options here, or leave empty to use the default settings
                override = function(root_dir, library)
                    if root_dir:find("dotfiles", 1, true) == 1 then
                        library.enabled = true
                        library.plugins = true
                    end
                end,
                library = { plugins = { 'nvim-dap-ui' }, types = true },
            })


            lsp.set_preferences({
                suggest_lsp_servers = false,
                setup_servers_on_start = true,
                set_lsp_keymaps = true,
                configure_diagnostics = true,
                cmp_capabilities = true,
                manage_nvim_cmp = true,
                call_servers = 'local',
                sign_icons = {
                    error = '✘',
                    warn = '▲',
                    hint = '⚑',
                    info = '',
                },
            })

            -- Keymaps
            lsp.on_attach(function(_, bufnr)
                local opts = { buffer = bufnr, remap = false }
                opts["desc"] = "Go to definition"
                vim.keymap.set("n", "gd", function() vim.lsp.buf.definition() end, opts)
                -- vim.keymap.set("n", "K", function() vim.lsp.buf.hover() end, opts)
                -- vim.keymap.set("n", "<leader>vws", function() vim.lsp.buf.workspace_symbol() end, opts)
                opts["desc"] = "Open diagonistic float"
                vim.keymap.set("n", "<leader>vd", function() vim.diagnostic.open_float() end, opts)
                opts["desc"] = "Next diagnostic"
                vim.keymap.set("n", "]d", function() vim.diagnostic.goto_next() end, opts)
                opts["desc"] = "Previous diagnostic"
                vim.keymap.set("n", "[d", function() vim.diagnostic.goto_prev() end, opts)
                opts["desc"] = "Show code actions"
                vim.keymap.set("n", "<leader>va", function() vim.lsp.buf.code_action() end, opts)
                opts["desc"] = "Show references"
                vim.keymap.set("n", "<leader>vR", function() vim.lsp.buf.references() end, opts)
                opts["desc"] = "Rename"
                vim.keymap.set("n", "<leader>vr", function() vim.lsp.buf.rename() end, opts)
                opts["desc"] = "Help"
                vim.keymap.set("i", "<C-h>", function() vim.lsp.buf.signature_help() end, opts)
                opts["desc"] = "Format"
                vim.keymap.set({'n'}, '<leader>F', '<cmd>lua vim.lsp.buf.format({async = true})<cr>', opts)
                opts["desc"] = "find references"
                vim.keymap.set({'n', 'x'}, '<leader>pr', '<cmd>Telescope lsp_references<cr>', opts)
                local wk = require("which-key")
                wk.register({
                    v = {
                        name = "lsp",
                        r = "Rename"
                    }
                }, {prefix = "<leader>"})
            end)

            lsp.setup()

            local null_ls = require('null-ls')
            local null_opts = lsp.build_options('null-ls', {})

            null_ls.setup({
                on_attach = function(client, bufnr)
                    null_opts.on_attach(client, bufnr)
                end,
                sources = {
                    -- Replace these with the tools you have installed
                    null_ls.builtins.formatting.prettier,
                    null_ls.builtins.diagnostics.eslint,
                    null_ls.builtins.formatting.stylua,
                    null_ls.builtins.diagnostics.ruff,
                    null_ls.builtins.diagnostics.mypy
                }
            })

            -- Mason yummy borders
            require('mason').setup({ ui = { border = "rounded" } })
            -- Mason LSP
            require('mason-lspconfig').setup({
                ensure_installed = { 'tsserver', 'rust_analyzer' },
                automatic_installation = true,
                handlers = {
                    lsp.default_setup,
                    lua_ls = function()
                        local lua_opts = lsp.nvim_lua_ls()
                        require('lspconfig').lua_ls.setup(lua_opts)
                    end,
                },
            })

            -- LSP Info nice borders
            require('lspconfig.ui.windows').default_options.border = 'single'

            -- CMP autocompletion
            local cmp = require('cmp')
            local cmp_select = { behavior = cmp.SelectBehavior.Select }
            cmp.setup({
                sources = {
                    { name = 'path' },
                    { name = 'nvim_lsp' },
                    { name = 'nvim_lua' },
                    { name = 'buffer' },
                },
                window = {
                    completion = cmp.config.window.bordered({
                        winhighlight = "normal:normal,floatborder:borderbg,cursorline:pmenusel,search:none",
                    }),
                    documentation = cmp.config.window.bordered({
                        winhighlight = "normal:normal,floatborder:borderbg,cursorline:pmenusel,search:none",
                    })
                },
                formatting = lsp.cmp_format(),
                mapping = cmp.mapping.preset.insert({
                    ['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
                    ['<C-n>'] = cmp.mapping.select_next_item(cmp_select),
                    ['<C-a>'] = cmp.mapping.confirm({ select = true }),
                    ['<C-Space>'] = cmp.mapping.complete(),
                }),
            })

            -- Use tab to navigate completion menu but only open
            vim.keymap.set("i", "<Tab>", function()
                if cmp.visible() then
                    cmp.select_next_item()
                else
                    vim.fn.feedkeys(vim.api.nvim_replace_termcodes("<Tab>", true, true, true), "n")
                end
            end)

            -- Use buffer source for `/` and `?` (if you enabled `native_menu`, this won't work anymore).
            cmp.setup.cmdline({ '/', '?' }, {
                mapping = cmp.mapping.preset.cmdline(),
                sources = {
                    { name = 'buffer' }
                }
            })

            -- Use cmdline & path source for ':' (if you enabled `native_menu`, this won't work anymore).
            cmp.setup.cmdline(':', {
                mapping = cmp.mapping.preset.cmdline(),
                sources = cmp.config.sources({
                    { name = 'path' }
                }, {
                    { name = 'cmdline' }
                })
            })
        end
    },
}
