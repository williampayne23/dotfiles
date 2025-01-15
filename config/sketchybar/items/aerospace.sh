
WS=$(aerospace list-workspaces --focused)
sketchybar \
    --add event aerospace_workspace_change \
    --add item aerospace_workspace left \
    --subscribe aerospace_workspace aerospace_workspace_change \
    --set aerospace_workspace \
        background.color=0x44ffffff \
        background.corner_radius=5 \
        background.height=20 \
        background.drawing=off \
        label.color=0xffffffff \
        label="$WS" \
        script="$CONFIG_DIR/plugins/aerospace.sh"
