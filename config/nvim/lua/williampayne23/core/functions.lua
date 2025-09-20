local function tbl_length(T)
    local count = 0
    for _ in pairs(T) do count = count + 1 end
    return count
end


local function get_visual_selection()
    -- this will exit visual mode
    -- use 'gv' to reselect the text
    local _, csrow, cscol, cerow, cecol
    local mode = vim.fn.mode()
    if mode == "v" or mode == "V" or mode == "" then
        -- if we are in visual mode use the live position
        _, csrow, cscol, _ = unpack(vim.fn.getpos("."))
        _, cerow, cecol, _ = unpack(vim.fn.getpos("v"))
        if mode == "V" then
            -- visual line doesn't provide columns
            cscol, cecol = 0, 999
        end
        -- exit visual mode
        vim.api.nvim_feedkeys(
            vim.api.nvim_replace_termcodes("<Esc>",
                true, false, true), "n", true)
    else
        -- otherwise, use the last known visual position
        _, csrow, cscol, _ = unpack(vim.fn.getpos("'<"))
        _, cerow, cecol, _ = unpack(vim.fn.getpos("'>"))
    end
    -- swap vars if needed
    if cerow < csrow then csrow, cerow = cerow, csrow end
    if cecol < cscol then cscol, cecol = cecol, cscol end
    local lines = vim.fn.getline(csrow, cerow)
    -- local n = cerow-csrow+1
    local n = tbl_length(lines)
    if n <= 0 then return "" end
    lines[n] = string.sub(lines[n], 1, cecol)
    lines[1] = string.sub(lines[1], cscol)
    return table.concat(lines, "\n")
end

local function split(str, split)
    local t = {}
    local section = ""
    for char in str:gmatch(".") do
        if char == split then
            table.insert(t, section)
            section = ""
        else
            section = section .. char
        end
    end
    table.insert(t, section)
    return t
end

function FlipAround()
    local char = vim.fn.nr2char(vim.fn.getchar())
    local selection = get_visual_selection()
    if not string.find(selection, char) then
        return
    end

    -- Make this better I could instead split by contiguous occurrences of the char which lets me flip around ==
    local t = split(selection, char)

    local left = t[1]
    print(t[2])
    local right = table.concat(t, char, 2)
    -- If the first element starts with tabs strip it (vim magic seems to include them when we paste)
    local tab = string.match(left, "^%s+")
    if tab then
        left = string.sub(left, string.len(tab) + 1)
    end

    -- If first element ends with spaces, move them to the end of the second element
    local space = string.match(left, "%s+$")
    if space then
        left = string.sub(left, 1, -string.len(space) - 1)
        right = right .. space
    end
    -- If the last element starts with spaces, move them to the start of the first element
    space = string.match(right, "^%s+")
    if space then
        right = string.sub(right, string.len(space) + 1)
        left = space .. left
    end
    local flipped = right .. char .. left
    vim.api.nvim_feedkeys('gv', 'm', false)
    local _, cerow, cecol, _ = unpack(vim.fn.getpos("."))
    -- Get the line we are on
    local lines = vim.fn.getline(cerow, cerow)
    local line = lines[1]
    -- If the end cursor position is greater than the length of the line add a new line
    -- This is to prevent pulling in the next line
    if cecol > string.len(line) then
        vim.api.nvim_feedkeys('h', 'm', false)
    end
    vim.api.nvim_feedkeys("c" .. flipped, 'm', false)
    local keys = vim.api.nvim_replace_termcodes('<ESC>', true, false, true)
    vim.api.nvim_feedkeys(keys, 'm', false)
    -- put cursor back
    vim.api.nvim_feedkeys('`<', 'm', false)
end

local function get_or_create_buffer(filename)
    -- Only changed function relative to harpoon. Now allows a terminal buffer
    local buf_exists = vim.fn.bufexists(filename) ~= 0
    if buf_exists then
        return vim.fn.bufnr(filename)
    end

    return vim.fn.bufadd(filename)
end

function Nav_Buffer(id)
    local marked = require("harpoon.mark")
    local idx = marked.get_index_of(id)
    if not marked.valid_index(idx) then
        return
    end

    local mark = marked.get_marked_file(idx)
    local filename = mark.filename --vim.fs.normalize(mark.filename)
    local buf_id = get_or_create_buffer(filename)
    local set_row = not vim.api.nvim_buf_is_loaded(buf_id)

    local old_bufnr = vim.api.nvim_get_current_buf()

    vim.api.nvim_set_current_buf(buf_id)
    vim.api.nvim_buf_set_option(buf_id, "buflisted", true)
    if set_row and mark.row and mark.col then
        vim.cmd(string.format(":call cursor(%d, %d)", mark.row, mark.col))
    end


    -- Gets info of pre switch buffer and if it's boring deletes it
    local old_bufinfo = vim.fn.getbufinfo(old_bufnr)
    if type(old_bufinfo) == "table" and #old_bufinfo >= 1 then
        old_bufinfo = old_bufinfo[1]
        local no_name = old_bufinfo.name == ""
        local one_line = old_bufinfo.linecount == 1
        local unchanged = old_bufinfo.changed == 0
        if no_name and one_line and unchanged then
            vim.api.nvim_buf_delete(old_bufnr, {})
        end
    end
end
