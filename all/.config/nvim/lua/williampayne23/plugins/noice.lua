return {
    {
        "folke/noice.nvim",
        event = "VeryLazy",
        opts = {
            -- add any options here
        },
        dependencies = {
            -- if you lazy-load any plugin below, make sure to add proper `module="..."` entries
            "MunifTanjim/nui.nvim",
            -- OPTIONAL:
            --   `nvim-notify` is only needed, if you want to use the notification view.
            --   If not available, we use `mini` as the fallback
            -- "rcarriga/nvim-notify",
        },
        config = function()
            require("noice").setup({
                lsp = {
                    -- override markdown rendering so that **cmp** and other plugins use **Treesitter**
                    override = {
                        ["vim.lsp.util.convert_input_to_markdown_lines"] = true,
                        ["vim.lsp.util.stylize_markdown"] = true,
                        ["cmp.entry.get_documentation"] = true,
                    },
                },
                -- you can enable a preset for easier configuration
                presets = {
                    bottom_search = true,         -- use a classic bottom cmdline for search
                    command_palette = true,       -- position the cmdline and popupmenu together
                    long_message_to_split = true, -- long messages will be sent to a split
                    inc_rename = false,           -- enables an input dialog for inc-rename.nvim
                    lsp_doc_border = true,        -- add a border to hover docs and signature help
                },
                notify = {
                    -- Noice can be used as `vim.notify` so you can route any notification like other messages
                    -- Notification messages have their level and other properties set.
                    -- event is always "notify" and kind can be any log level as a string
                    -- The default routes will forward notifications to nvim-notify
                    -- Benefit of using Noice for this is the routing and consistent history view
                    enabled = true,
                    view = "mini",
                },
                views = {
                },
                --     views = {

                --         cmdline_popup = {
                --             position = {
                --                 row = 5,
                --                 col = "50%",
                --             },
                --             size = {
                --                 width = 60,
                --                 height = "auto",
                --             },
                --         },
                --         popupmenu = {
                --             relative = "editor",
                --             position = {
                --                 row = 8,
                --                 col = "50%",
                --             },
                --             size = {
                --                 width = 60,
                --                 height = 10,
                --             },
                --             border = {
                --                 style = "rounded",
                --                 padding = { 0, 1 },
                --             },
                --             win_options = {
                --                 winhighlight = { Normal = "Normal", FloatBorder = "DiagnosticInfo" },
                --             },
                --         },
                --     },
                cmdline = {
                    view = "cmdline",
                },
            })
        end,
    }
}
