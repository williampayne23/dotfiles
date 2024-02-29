source ~/.config/zsh/antigen.zsh

antigen use oh-my-zsh

antigen bundle git
antigen bundle fzf
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle jeffreytse/zsh-vi-mode
antigen bundle command-not-found
antigen bundle zsh-users/zsh-autosuggestions
antigen bundle conda
antigen bundle esc/conda-zsh-completion

antigen theme robbyrussell

antigen apply
