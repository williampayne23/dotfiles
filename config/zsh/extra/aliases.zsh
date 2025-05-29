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

_s_autocomplete() {
    # All branch names
    # + all remote branches
    # + all branches that start with will/ with the will/ prefix removed
    branches="$(git for-each-ref --format='%(refname:short)' refs/heads)"
    remote_branches="$(git for-each-ref --format='%(refname:short)' refs/remotes/origin | sed 's/^origin\///')"
    will_branches="$(git for-each-ref --format='%(refname:short)' refs/heads | grep '^will/' | sed 's/will\///')"

    COMPREPLY=()
    COMPREPLY+=($branches)
    COMPREPLY+=($remote_branches)
    COMPREPLY+=($will_branches)
}

complete -F _s_autocomplete s

alias gfp='git push --force-with-lease'

git_branch_status() {
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo "Error: Not in a git repository"
        return 1
    fi

    ISSUES=0
    # Check for uncommitted changes in current branch
    if ! git diff --quiet --exit-code || ! git diff --cached --quiet --exit-code; then
        echo "Warning: Uncommitted changes in current branch ($(git branch --show-current))"
        ISSUES=1
    fi


    # Get all local branches
    while IFS= read -r branch; do
        # Get the upstream branch
        upstream=$(git rev-parse --abbrev-ref "$branch@{upstream}" 2>/dev/null)
        
        if [ $? -eq 0 ]; then
            # Check if local branch is ahead
            ahead=$(git rev-list --count "$upstream..$branch" 2>/dev/null)
            if [ "$ahead" -gt 0 ]; then
                ISSUES=1
                echo "$branch [ahead $ahead]"
            fi
        else
            # No upstream tracking
            ISSUES=1
            echo "$branch [not tracked]"
        fi
    done < <(git for-each-ref --format='%(refname:short)' refs/heads/)
    return $ISSUES
}

# Check if I have unpushed work
workcheck () {
    # get current directory
    current_dir=$(pwd)
    # find all .git folders one level down
    find . -maxdepth 2 -type d -name .git | while read gitdir; do
        # get the directory containing the .git folder
        dir=$(dirname $gitdir)
        # cd into the directory
        cd $dir
        # print the directory name
        answer=$(git_branch_status)
        if [ $? -eq 1 ]; then
            echo "$dir:"
            echo "$answer"
        fi
        cd $current_dir
    done
}
