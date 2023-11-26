return {
    {
        "theprimeagen/harpoon",
        config = function()
            local mark = require("harpoon.mark")
            local ui = require("harpoon.ui")
            -- local cmd_ui = require('harpoon.cmd-ui')
            vim.keymap.set("n", "<leader>a", mark.add_file, {desc = "add harpoon"})
            vim.keymap.set("n", "<C-e>", ui.toggle_quick_menu)
            -- vim.keymap.set("n", "´", function()
            --     cmd_ui.toggle_quick_menu()
            -- end)

            vim.keymap.set("n", "<C-h>", function() ui.nav_file(1) end)
            vim.keymap.set("n", "<C-j>", function() ui.nav_file(2) end)
            vim.keymap.set("n", "<C-k>", function() ui.nav_file(3) end)
            vim.keymap.set("n", "<C-l>", function() ui.nav_file(4) end)

            -- vim.keymap.set("n", "˙", function()
            --     term.sendCommand(1, 1)
            --     term.gotoTerminal(1)
            --     vim.fn.feedkeys("a")
            -- end)
            -- vim.keymap.set("n", "∆", function()
            --     term.sendCommand(2, 2)
            --     term.gotoTerminal(2)
            --     vim.fn.feedkeys("a")
            -- end)
            -- vim.keymap.set("n", "˚", function()
            --     term.sendCommand(1, 1)
            --     term.gotoTerminal(3)
            --     vim.fn.feedkeys("a")
            -- end)
            -- vim.keymap.set("n", "¬", function()
            --     term.sendCommand(1, 1)
            --     term.gotoTerminal(4)
            --     vim.fn.feedkeys("a")
            -- end)
        end
    }
}
