alias cat=bat
alias cat!=\\cat
alias c=clear
alias cd=z
alias cd!=\\cd


nr() {
    nix run nixpkgs#"$1" -- "${@:2}"
}

_switch_if_exists() {
    # $1 should be branch name
    # If branch exists (either locally or remote) git switch to it
    # If branch does not exist, return an error
    branch_name=$1
    if git show-ref --verify --quiet refs/heads/$branch_name; then
        git switch $branch_name
    elif git show-ref --verify --quiet refs/remotes/origin/$branch_name; then
        git switch $branch_name
    else
        return 1
    fi
}

s(){
    # $1 should be branch name
    # If no argument is passed, switch to main
    branch_name=$1

    # If branch_name is -h print a help message
    if [ "$branch_name" = "-h" ]; then
        echo "Usage: s [branch_name]"
        echo "Switch to branch_name or will/branch_name if it exists (prioritise branch_name), otherwise create a new branch called will/branch_name"
        return
    fi

    if [ -z "$branch_name" ]; then
        branch_name=main
    fi

    # If branch exists (either locally or remote) git switch to it
    if _switch_if_exists $branch_name; then
        return
    fi

    # If the branch name is not called will/* prepend will/
    if [[ $branch_name != will/* ]]; then
        branch_name="will/$branch_name"
    fi
    
    # If a branch of the new name exists switch to it
    if _switch_if_exists $branch_name; then
        return
    fi

    # Otherwise create a new branch   
    git switch -c $branch_name
}
