# Homebrew
if [ -x /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

#Zsh vim mode
bindkey -v

# No autcomplete beep
unsetopt BEEP

# Colors
export TERM=xterm-256color
