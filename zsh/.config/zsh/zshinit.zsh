# Antigen
source ~/.config/zsh/antigenrc.zsh

# source all extra files
for file in ~/.config/zsh/extra/*.zsh; do
    source "$file"
done

#Zoxide setup
eval "$(zoxide init zsh)"

#atuin setup
eval "$(atuin init zsh)"
