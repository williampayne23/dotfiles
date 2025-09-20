vim.g.tmux_navigator_no_mappings = 1

if vim.env.PROF then
    -- example for lazy.nvim
    -- change this to the correct path for your plugin manager
    local snacks = vim.fn.stdpath("data") .. "/lazy/snacks.nvim"
    vim.opt.rtp:append(snacks)
    require("snacks.profiler").startup({
        startup = {
            event = "VimEnter", -- stop profiler on this event. Defaults to `VimEnter`
            -- event = "UIEnter",
            -- event = "VeryLazy",
        },
    })
end

require("williampayne23.core.functions")
require("williampayne23.core.set")
require("williampayne23.core.remap")
require("williampayne23.core.theme")
