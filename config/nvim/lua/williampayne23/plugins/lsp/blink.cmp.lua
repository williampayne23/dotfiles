return {
    "saghen/blink.cmp",
    lazy = true,
    event = "InsertEnter",
    -- optional: provides snippets for the snippet source
    dependencies = {
        "rafamadriz/friendly-snippets",
        "fang2hou/blink-copilot",
        "folke/lazydev.nvim",
    },

    -- use a release tag to download pre-built binaries
    version = "1.*",

    ---@module 'blink.cmp'
    ---@type blink.cmp.Config
    opts = {
        keymap = {
            preset = "default",
            -- Unmap arrows they get in the way
            ["<Up>"] = false,
            ["<Down>"] = false,
            -- Use <C-a> instead of <C-y> to accept
            ["<C-y>"] = false,
            ["<C-a>"] = { "accept" },

            ["<C-d>"] = { "show_documentation", "hide_documentation" },
        },

        signature = {
            enabled = true,
            window = {
                border = "rounded",
                max_width = 80,
                max_height = 20,
            },
        },

        completion = {
            documentation = {
                auto_show = false,
                window = {
                    border = "rounded",
                    max_width = 80,
                    max_height = 20,
                },
            },
            menu = {
                -- winblend = 30, -- Transparency of the completion menu
                auto_show = true,
                border = "rounded",
                direction_priority = { "n", "s" },
            },
            trigger = {
                -- Trigger completion on <C-Space> or <C-x><C-o>
                prefetch_on_insert = true, -- might be buggy, according to the doc
                show_on_insert = true,
            },
            -- ghost_text = { enabled = true },
        },

        -- Default list of enabled providers defined so that you can extend it
        -- elsewhere in your config, without redefining it, due to `opts_extend`
        sources = {
            default = {
                "copilot",
                "lsp",
                "lazydev",
                "path",
                "snippets",
                "buffer",
                "cmdline",
            },
            providers = {
                copilot = {
                    name = "copilot",
                    module = "blink-copilot",
                    score_offset = 100,
                    async = true,
                    opts = {},
                },
                lazydev = {
                    name = "LazyDev",
                    module = "lazydev.integrations.blink",
                    -- make lazydev completions top priority (see `:h blink.cmp`)
                    score_offset = 100,
                },
            },
        },

        -- (Default) Rust fuzzy matcher for typo resistance and significantly better performance
        -- You may use a lua implementation instead by using `implementation = "lua"` or fallback to the lua implementation,
        -- when the Rust fuzzy matcher is not available, by using `implementation = "prefer_rust"`
        --
        -- See the fuzzy documentation for more information
        fuzzy = { implementation = "prefer_rust_with_warning" },
    },
    opts_extend = { "sources.default" },
}
