# fzf
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border'
# Use ~~ as the trigger sequence instead of the default **
export FZF_COMPLETION_TRIGGER='~~'
export FZF_COMPLETION_OPTS='--border --info=inline'
export FZF_TMUX_OPTS="-p 55%,10%"

_fzf_compgen_cd() {
    fd --hidden --follow --exclude ".git" --exclude "Library" --exclude "node_modules" . "$1"
}
