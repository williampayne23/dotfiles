# Antidote
if [ ! -d ~/.config/zsh/antidote ]; then
    git clone --depth=1 https://github.com/mattmc3/antidote.git ~/.config/zsh/antidote
fi

source ~/.config/zsh/antidote/antidote.zsh
antidote load ~/.config/zsh/zsh_plugins.txt

# source all extra files
for file in ~/.config/zsh/extra/*.zsh; do
    source "$file"
done

#Zoxide setup
eval "$(zoxide init zsh)"

#atuin setup
eval "$(atuin init zsh)"

#starship setup
eval "$(starship init zsh)"
