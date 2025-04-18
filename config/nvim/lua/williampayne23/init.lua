-- if os.getenv("ZELLIJ") == "0" then
-- CursorLineNrCursorLineNr CursorLineNr   vim.g.tpipeline_refreshcmd = "kitty @ set-tab-title Master test"
-- end

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

require("williampayne23.lazy")
require("williampayne23.functions")
require("williampayne23.set")
require("williampayne23.remap")
require("williampayne23.theme")
