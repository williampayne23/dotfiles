-- if os.getenv("ZELLIJ") == "0" then
-- CursorLineNrCursorLineNr CursorLineNr   vim.g.tpipeline_refreshcmd = "kitty @ set-tab-title Master test"
-- end

vim.g.tmux_navigator_no_mappings = 1

require("williampayne23.lazy")
require("williampayne23.functions")
require("williampayne23.set")
require("williampayne23.remap")
require("williampayne23.theme")
