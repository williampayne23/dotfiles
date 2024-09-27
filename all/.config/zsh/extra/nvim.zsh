function scratch() {
    nvim +noswapfile +"set buftype=nofile" +"set bufhidden=hide" +"file scratch"
}

function ngit() {
    inrepo=$(git rev-parse --is-inside-work-tree 2>/dev/null)
    if [[ $inrepo == "true" ]]; then
        nvim +Neogit quit_nvim # Open a buffer called quit_nvim which I look for in my vimrc to close neovim after quitting neogit
    else
        echo "Not in a git repository"
    fi
}

alias ng=ngit
alias nv=nvim
alias vim=nvim
alias vim!=\\vim
