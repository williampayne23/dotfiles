alias cat=bat
alias cat!=\\cat
alias c=clear
alias cd=z
alias cd!=\\cd


nr() {
    nix run nixpkgs#"$1" -- "${@:2}"
}
