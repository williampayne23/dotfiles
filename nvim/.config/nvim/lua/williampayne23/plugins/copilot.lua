return {
    { "zbirenbaum/copilot.lua",
    config = function()
        require("copilot").setup({
            suggestion = {
                auto_trigger = true,
            }
        })
        vim.keymap.set("i", "<Right>", function()

            local cursorCol = vim.fn.col(".");
            if require("copilot.suggestion").is_visible() then
            -- if cursorCol == vim.fn.col("$") then
                require("copilot.suggestion").accept()
            else
                vim.cmd(string.format(":call cursor(%d, %d)", vim.fn.line("."), cursorCol + 1))
            end
        end, {silent = true})
    end}
}
