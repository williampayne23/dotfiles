#!/bin/bash
# Allow users to setup their own client hooks scripts by looking in special folder
# I do this because I only need this feature for work machines.

cleanup_script_dir="$HOME/.config/dotfiles/tmux_hooks/"
event="$1"
path_to_script="$cleanup_script_dir/${event}.sh"

if [[ -f "$path_to_script" ]]; then
    bash "$path_to_script"
fi

