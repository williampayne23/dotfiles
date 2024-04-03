# Wills Dotfiles

Use stow (`brew install stow` on mac) to install these. You need to be in the dotfiles directory which needs to be in the home directory (unless you configure stow)

You must include source ~/.config/zsh/zshinit.zsh

For bat you need to run `bat cache --build`

## TODO:
- [ ] Pylsps produce a bunch of not found messages every time you hover (presumably because all but one LSP can't handle hover?
- [ ] Good installer script which solves the bat cache problem
- [ ] Refactor into minimal and GUI installs
- [ ] Zoxide + tmux path switcher
- [ ] Harpoon for tmux file paths
