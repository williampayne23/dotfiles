local handler = function(virtText, lnum, endLnum, width, truncate)
    local newVirtText = {}
    local suffix = (' 󰁂 %d '):format(endLnum - lnum)
    local sufWidth = vim.fn.strdisplaywidth(suffix)
    local targetWidth = width - sufWidth
    local curWidth = 0
    for _, chunk in ipairs(virtText) do
        local chunkText = chunk[1]
        local chunkWidth = vim.fn.strdisplaywidth(chunkText)
        if targetWidth > curWidth + chunkWidth then
            table.insert(newVirtText, chunk)
        else
            chunkText = truncate(chunkText, targetWidth - curWidth)
            local hlGroup = chunk[2]
            table.insert(newVirtText, { chunkText, hlGroup })
            chunkWidth = vim.fn.strdisplaywidth(chunkText)
            -- str width returned from truncate() may less than 2nd argument, need padding
            if curWidth + chunkWidth < targetWidth then
                suffix = suffix .. (' '):rep(targetWidth - curWidth - chunkWidth)
            end
            break
        end
        curWidth = curWidth + chunkWidth
    end
    table.insert(newVirtText, { suffix, 'MoreMsg' })
    return newVirtText
end

return {
    { 'williamboman/mason.nvim' },
    { 'williamboman/mason-lspconfig.nvim' },
    {
        'kevinhwang91/nvim-ufo',
        dependencies = {
            'kevinhwang91/promise-async'
        },
        config = function()
            vim.o.foldlevel = 99 -- Using ufo provider need a large value, feel free to decrease the value
            vim.o.foldlevelstart = 99
            local capabilities = vim.lsp.protocol.make_client_capabilities()
            capabilities.textDocument.foldingRange = {
                dynamicRegistration = false,
                lineFoldingOnly = true
            }
            local language_servers = require("lspconfig").util.available_servers()     -- or list servers manually like {'gopls', 'clangd'}
            for _, ls in ipairs(language_servers) do
                require('lspconfig')[ls].setup({
                    capabilities = capabilities
                    -- you can add other fields for setting up lsp server in this table
                })
            end
            require('ufo').setup({
                fold_virt_text_handler = handler
            })
            vim.keymap.set('n', 'K', function()
                local winid = require('ufo').peekFoldedLinesUnderCursor()
                if not winid then
                    -- choose one of coc.nvim and nvim lsp
                    -- vim.fn.CocActionAsync('definitionHover')     -- coc.nvim
                    vim.lsp.buf.hover()
                end
            end)
        end
    },
    {
        "folke/neodev.nvim",
        config = function()
            -- IMPORTANT: make sure to setup neodev BEFORE lspconfig
            require("neodev").setup({
                -- add any options here, or leave empty to use the default settings
                plugins = { "nvim-treesitter", "plenary.nvim", "telescope.nvim", "Comment.nvim" },
            })
        end,
        priority = 1000,
    },
    {
        'VonHeikemen/lsp-zero.nvim',
        branch = 'v3.x',
        config = function()
            local lsp_zero = require('lsp-zero')

            lsp_zero.on_attach(function(_, bufnr)
                local opts = { buffer = bufnr, remap = false }
                opts["desc"] = "Go to definition"
                vim.keymap.set("n", "gd", function() vim.lsp.buf.definition() end, opts)
                -- vim.keymap.set("n", "K", function() vim.lsp.buf.hover() end, opts)
                -- vim.keymap.set("n", "<leader>vws", function() vim.lsp.buf.workspace_symbol() end, opts)
                opts["desc"] = "Open diagonistic float"
                vim.keymap.set("n", "<leader>vd", function() vim.diagnostic.open_float() end, opts)
                opts["desc"] = "Next diagnostic"
                vim.keymap.set("n", "[d", function() vim.diagnostic.goto_next() end, opts)
                opts["desc"] = "Previous diagnostic"
                vim.keymap.set("n", "]d", function() vim.diagnostic.goto_prev() end, opts)
                opts["desc"] = "Show code actions"
                vim.keymap.set("n", "<leader>va", function() vim.lsp.buf.code_action() end, opts)
                opts["desc"] = "Show references"
                vim.keymap.set("n", "<leader>vR", function() vim.lsp.buf.references() end, opts)
                opts["desc"] = "Rename"
                vim.keymap.set("n", "<leader>vr", function() vim.lsp.buf.rename() end, opts)
                opts["desc"] = "Help"
                vim.keymap.set("i", "<C-h>", function() vim.lsp.buf.signature_help() end, opts)
                local wk = require("which-key")
                wk.register({
                    v = {
                        name = "lsp",
                        r = "Rename"
                    }
                }, {prefix = "<leader>"})
            end)

            require('mason').setup({ ui = { border = "rounded" } })
            require('mason-lspconfig').setup({
                ensure_installed = { 'tsserver', 'rust_analyzer' },
                automatic_installation = true,
                handlers = {
                    lsp_zero.default_setup,
                    lua_ls = function()
                        local lua_opts = lsp_zero.nvim_lua_ls()
                        require('lspconfig').lua_ls.setup(lua_opts)
                    end,
                },
            })

            require('lspconfig.ui.windows').default_options.border = 'single'

            local cmp = require('cmp')
            local cmp_select = { behavior = cmp.SelectBehavior.Select }
            cmp.setup({
                sources = {
                    { name = 'path' },
                    { name = 'nvim_lsp' },
                    { name = 'nvim_lua' },
                },
                window = {
                    completion = cmp.config.window.bordered({
                        winhighlight = "normal:normal,floatborder:borderbg,cursorline:pmenusel,search:none",
                    }),
                    documentation = cmp.config.window.bordered({
                        winhighlight = "normal:normal,floatborder:borderbg,cursorline:pmenusel,search:none",
                    })
                },
                formatting = lsp_zero.cmp_format(),
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
    { 'neovim/nvim-lspconfig' },
    { 'hrsh7th/cmp-nvim-lsp' },
    { 'hrsh7th/nvim-cmp' },
    { 'hrsh7th/cmp-buffer' },
    { 'hrsh7th/cmp-cmdline' },
    { 'L3MON4D3/LuaSnip' },
}
