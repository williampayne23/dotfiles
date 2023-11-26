function Test()
    local output = vim.api.nvim_exec2("! tmux display-message -p \\#S", {output = true}).output
    local session = string.match(output, "%[.+%]")
    vim.notify(session)
end

function Scratch()
    -- Define the size of the floating window
    local width = 100
    local height = 20

    -- Create the scratch buffer displayed in the floating window
    local buf = vim.api.nvim_create_buf(false, true)

    -- Get the current UI
    local win_width = vim.api.nvim_win_get_width(0)
    local win_height = vim.api.nvim_win_get_height(0)
    -- local ui = vim.api.nvim_list_uis()[0]

    -- Create the floating window
    local opts = {
        relative='editor',
        width=width,
        height=height,
        col=(win_width/2) - (width/2),
        row=(win_height/2) - (height/2),
        anchor='NW',
        style='minimal',
        border='rounded',
        title="Scratch"
    }
    local win = vim.api.nvim_open_win(buf, true, opts)
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
