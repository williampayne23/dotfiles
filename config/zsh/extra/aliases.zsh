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

s () {
        branch_name=$1
        if [ "$branch_name" = "-h" ]
        then
                echo "Usage: s [branch_name]"
                echo "Switch to branch_name or will/branch_name if it exists (prioritise branch_name), otherwise create a new branch called will/branch_name"
                return
        fi
        if [ -z "$branch_name" ]
        then
                branch_name=main
        fi
        if _switch_if_exists $branch_name
        then
                return
        fi
        if [[ $branch_name != will/* ]]
        then
                branch_name="will/$branch_name"
        fi
        if _switch_if_exists $branch_name
        then
                return
        fi
        git switch -c $branch_name
}

alias gfp='git push --force-with-lease'

# Check if I have unpushed work
workcheck () {
    # find all .git folders one level down
    find . -maxdepth 2 -type d -name .git | while read gitdir; do
        # get the directory containing the .git folder
        dir=$(dirname $gitdir)
        # cd into the directory
        cd $dir
        # print the directory name
        echo $dir
        # quietly fetch the latest changes
        git fetch --quiet
        # list the unpushed work
        git for-each-ref --format="%(refname:short) %(upstream:track) %(upstream:remotename)" refs/heads
        # cd back to the original directory
        cd -
    done
}
