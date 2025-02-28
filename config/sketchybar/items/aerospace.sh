# Add an item for every workspace
# Add invisible root item for hadnling events
cmd="sketchybar \
    --add event aerospace_workspace_change \
    --add item aerospace_workspace.root left \
    --subscribe aerospace_workspace.root aerospace_workspace_change space_windows_change display_change\
    --set aerospace_workspace.root drawing=off \
    --set aerospace_workspace.root \
        script=\"$CONFIG_DIR/plugins/aerospace.sh\""

for i in $(aerospace list-workspaces --all); do
    cmd+=" --add item aerospace_workspace.$i left\
           --set aerospace_workspace.$i\
                 drawing=off\
                 icon=\"$i\"\
                 icon.font=\"sketchybar-app-font:Regular:12.0\"\
                 icon.color=\"0x99ffffff\"\
                 icon.y_offset=\"1\"\
                 label.font=\"sketchybar-app-font:Regular:12.0\"\
                 label.padding_right=\"4\"\
                 label.color=\"0x99ffffff\"\
                 click_script=\"aerospace workspace $i\""
done
eval "$cmd"
