
WS=$(aerospace list-workspaces --focused) 
sketchybar \
    --add event aerospace_workspace_change \
    --add item aerospace_workspace left \
    --subscribe aerospace_workspace aerospace_workspace_change \
    --set aerospace_workspace \
        label="$WS" \
        script="$CONFIG_DIR/plugins/aerospace.sh"
