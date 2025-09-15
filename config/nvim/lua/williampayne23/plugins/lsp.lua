return {
    -- mason-lspconfig has to be at the top of the list so that it's set up first
    -- Not totally sure why this breaks the handlers but it does and some help text
    -- somewhere recommended this
    {
        'williamboman/mason-lspconfig.nvim',
        -- Try load last to resolve continued unreliability with lsp configs being
        -- actually listened too >:(
        priority = 0,
        dependencies = {
            'neovim/nvim-lspconfig',
            {
                'williamboman/mason.nvim',
                opts = {
                    registries = {
                        "github:mason-org/mason-registry",
                        "github:Crashdummyy/mason-registry",
                    },
                    ui = {
                        border = "rounded",
                        icons = {
                            package_installed = "✓",
                            package_pending = "➜",
                            package_uninstalled = "✗"
                        }
                    }
                }
            }
        },
        config = function()
            vim.api.nvim_create_autocmd("BufWritePre", {
                callback = function(event)
                    local buffer = vim.api.nvim_get_current_buf()
                    -- Check if there's a lsp for the current buffer
                    -- There is probably some way to filter for lsp's with formatting
                    -- capabilities but I don't know how to do that
                    for _, client in pairs(vim.lsp.get_clients({ bufnr = buffer })) do
                        if client.name ~= "null-ls" and client.name ~= "copilot" then
                            vim.lsp.buf.format { async = false }
                            return
                        end
                    end
                end
            })
            -- Keymaps
            vim.api.nvim_create_autocmd('LspAttach', {
                desc = 'LSP actions',
                callback = function(event)
                    vim.keymap.set("n", "gd", function() vim.lsp.buf.definition() end, { desc = "Go To Definition" })
                    vim.keymap.set("n", "<leader>vd", function() vim.diagnostic.open_float() end,
                        { desc = "Open Diagonistic Float" })
                    vim.keymap.set("n", "]d", function() vim.diagnostic.goto_next() end, { desc = "Next Diagnostic" })
                    vim.keymap.set("n", "[d", function() vim.diagnostic.goto_prev() end, { desc = "Previous Diagnostic" })
                    vim.keymap.set("n", "<leader>va", function() vim.lsp.buf.code_action() end,
                        { desc = "Show Code Actions" })
                    vim.keymap.set("n", "<leader>vR", function() vim.lsp.buf.references() end,
                        { desc = "Show References" })
                    vim.keymap.set("n", "<leader>vr", function() vim.lsp.buf.rename() end, { desc = "Rename" })
                    vim.keymap.set("i", "<C-h>", function() vim.lsp.buf.signature_help() end, { desc = "Help" })
                    vim.keymap.set({ 'n' }, '<leader>f', '<cmd>lua vim.lsp.buf.format({async = true})<cr>', {
                        desc = "Format Buffer"
                    })
                    vim.keymap.set({ 'n', 'x' }, '<leader>pr', function() Snacks.picker.lsp_references() end,
                        { desc = "Find References" })
                    vim.keymap.set({ 'n', 'x' }, '<leader>v', '<Nop>', { desc = 'LSP' })
                end
            })

            -- Hacky workaround for mason-lspconfig not loading the handlers correctly
            vim.api.nvim_create_autocmd("LspAttach", {
                desc = "Fix lsp config",
                callback = function(args)
                    if not vim.g.lsp_config_fixed then
                        vim.cmd("Lazy reload mason-lspconfig.nvim")
                        vim.g.lsp_config_fixed = true
                    end
                end,
            })

            vim.diagnostic.config({ virtual_text = { source = "always" } })
            -- require('lspconfig').rust_analyzer.setup({
            --     settings = {
            --         ["rust-analyzer"] = {
            --             checkOnSave = {
            --                 command = "clippy",
            --             },
            --             cargo = {
            --                 buildScripts = {
            --                     enable = true,
            --                 },
            --                 proc_macro = {
            --                     enable = true,
            --                 },
            --             }
            --         },
            --     },
            -- })

            -- Mason LSP
            require('mason-lspconfig').setup({
                ensure_installed = { 'ts_ls', 'rust_analyzer', 'lua_ls', 'ruff', 'basedpyright', 'nil_ls', 'terraformls' },
                automatic_installation = true,
                handlers = {
                    function(server_name)
                        require('lspconfig')[server_name].setup({})
                    end,
                    lua_ls = function()
                        require('lspconfig').lua_ls.setup({
                            settings = {
                                Lua = {
                                    diagnostics = {
                                        globals = { 'vim' },
                                    },
                                },
                            }
                        })
                    end,
                    nil_ls = function()
                        require('lspconfig').nil_ls.setup({
                            autostart = true,
                            settings = {
                                ['nil'] = {
                                    formatting = {
                                        command = { "alejandra" },
                                    },
                                },
                            },
                        })
                    end,
                    basedpyright = function()
                        require('lspconfig').basedpyright.setup({
                            capabilities = {},
                            settings = {
                                basedpyright = {
                                    analysis = {
                                        typeCheckingMode = "basic",
                                    },
                                },
                            },
                        })
                    end,
                    ruff = function()
                        require('lspconfig').ruff.setup({
                            init_options = {
                                settings = {
                                }
                            }
                        })
                    end,
                    ts_ls = function()
                        require('lspconfig').ts_ls.setup({})
                    end,
                    emmet_language_server = function()
                        require('lspconfig').emmet_language_server.setup({})
                    end,
                },
            })
            -- LSP Info nice borders
            require('lspconfig.ui.windows').default_options.border = 'single'
        end

    },
    {
        "seblyng/roslyn.nvim",
        ---@module 'roslyn.config'
        ---@type RoslynNvimConfig
        opts = {},
        config = function()
            require("roslyn").setup()
            vim.lsp.config("roslyn", {
            })
        end
    },
    {
        "MysticalDevil/inlay-hints.nvim",
        event = "LspAttach",
        dependencies = { "neovim/nvim-lspconfig" },
        name = "inlay-hints",
        config = true,
    },
    {
        "folke/lazydev.nvim",
        ft = "lua", -- only load on lua files
        opts = {
            library = {
                -- See the configuration section for more details
                -- Load luvit types when the `vim.uv` word is found
                { path = "${3rd}/luv/library", words = { "vim%.uv" } },
            },
        },
    },
    {
        'hrsh7th/nvim-cmp',
        dependencies = {
            'hrsh7th/cmp-buffer',
            'hrsh7th/cmp-path',
            'hrsh7th/cmp-cmdline',
            'saadparwaiz1/cmp_luasnip',
            'hrsh7th/cmp-nvim-lsp',
            'hrsh7th/cmp-nvim-lua',
            'folke/lazydev.nvim',
        },
        event = "InsertEnter",
        config = function()
            -- CMP autocompletion
            local cmp = require('cmp')
            local cmp_select = { behavior = cmp.SelectBehavior.Select }
            cmp.setup({
                sources = {
                    { name = 'lazydev' },
                    { name = 'luasnip' },
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
    }
}
