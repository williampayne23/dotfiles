local function show_macro_recording()
    local recording_register = vim.fn.reg_recording()
    if recording_register == "" then
        return ""
    else
        -- vim.notify("Recording @" .. recording_register)
        return "Recording @" .. recording_register
    end
end

return {
    -- Puts the vim pipeline in tmux
    {
        "vimpostor/vim-tpipeline",
        config = function()
            vim.g.tpipeline_autoembed = 0
        end,
    },
    {
        "nvim-lualine/lualine.nvim",
        config = function()
            local lualine = require("lualine")
            vim.api.nvim_create_autocmd("RecordingEnter", {
                callback = function()
                    local timer = vim.loop.new_timer()
                    timer:start(
                        50,
                        0,
                        vim.schedule_wrap(function()
                            lualine.refresh({
                                place = { "statusline" },
                            })
                        end)
                    )
                end,
            })

            vim.api.nvim_create_autocmd("RecordingLeave", {
                callback = function()
                    -- This is going to seem really weird!
                    -- Instead of just calling refresh we need to wait a moment because of the nature of
                    -- `vim.fn.reg_recording`. If we tell lualine to refresh right now it actually will
                    -- still show a recording occuring because `vim.fn.reg_recording` hasn't emptied yet.
                    -- So what we need to do is wait a tiny amount of time (in this instance 50 ms) to
                    -- ensure `vim.fn.reg_recording` is purged before asking lualine to refresh.
                    local timer = vim.loop.new_timer()
                    timer:start(
                        50,
                        0,
                        vim.schedule_wrap(function()
                            lualine.refresh({
                                place = { "statusline" },
                            })
                        end)
                    )
                end,
            })
            -- Bubbles config for lualine
            -- Author: lokesh-krishna
            -- MIT license, see LICENSE for more details.

            -- stylua: ignore
            local colors = {
                blue   = '#97A7E3',
                cyan   = '#79dac8',
                black  = '#313445',
                white  = '#c6c6c6',
                red    = '#ff5189',
                violet = '#d183e8',
                grey   = '#303030',
            }

            local bubbles_theme = {
                normal = {
                    a = { fg = colors.black, bg = colors.blue },
                    b = { fg = colors.white, bg = colors.grey },
                    c = { fg = colors.black, bg = colors.black },
                    x = { fg = colors.white, bg = colors.black },
                },

                insert = { a = { fg = colors.black, bg = colors.violet } },
                visual = { a = { fg = colors.black, bg = colors.cyan } },
                replace = { a = { fg = colors.black, bg = colors.red } },

                inactive = {
                    a = { fg = colors.white, bg = colors.black },
                    b = { fg = colors.white, bg = colors.black },
                    c = { fg = colors.black, bg = colors.black },
                },
            }

            require('lualine').setup {
                options = {
                    theme = bubbles_theme,
                    component_separators = '|',
                    section_separators = { left = '', right = '' },
                },
                sections = {
                    lualine_a = {
                        { 'mode', separator = { left = '' }, right_padding = 1 },
                    },
                    lualine_b = { 'filename', 'branch' },
                    lualine_c = { 'fileformat' },
                    lualine_x = {
                        {
                            "macro-recording",
                            fmt = show_macro_recording,
                        },
                    },
                    lualine_y = {
                        'filetype', 'progress' },
                    lualine_z = {
                        { 'location', separator = { right = '' }, left_padding = 2 },
                    },
                },
                inactive_sections = {
                    lualine_a = { 'filename' },
                    lualine_b = {},
                    lualine_c = {},
                    lualine_x = {},
                    lualine_y = {},
                    lualine_z = { 'location' },
                },
                tabline = {},
                extensions = {},
            }
        end
    },
}
