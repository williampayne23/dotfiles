#!/usr/bin/env bash
cmd="sketchybar --animate tanh 10"

if [[ "$SENDER" == "aerospace_workspace_change" ]]; then
    sketchybar --set aerospace_workspace.$(cat /tmp/sketchybar/last_focused) label.highlight="off" icon.highlight="off"\
               --set aerospace_workspace.$FOCUSED_WORKSPACE label.highlight="on" icon.highlight="on"
elif [[ "$SENDER" == "forced" ]]; then
    FOCUSED_WORKSPACE=$(aerospace list-workspaces --focused)
    sketchybar --set aerospace_workspace.$(cat /tmp/sketchybar/last_focused) label.highlight="off" icon.highlight="off"\
               --set aerospace_workspace.$FOCUSED_WORKSPACE label.highlight="on" icon.highlight="on"
else
    FOCUSED_WORKSPACE=$(cat /tmp/sketchybar/last_focused)
fi
echo $FOCUSED_WORKSPACE > /tmp/sketchybar/last_focused

WORKSPACE_WINDOWS=$(aerospace list-windows --all --json --format %{window-title}%{window-id}%{workspace}%{app-name} | jq 'reduce .[] as $item ({}; .[$item.workspace] = (if .[$item.workspace] then .[$item.workspace] + [$item] else [$item] end))')

workspace_has_windows() {
    [[ "true" = "$(echo $WORKSPACE_WINDOWS | jq "has(\"$1\")")" ]]
}

workspace_is_focused() {
    [[ "$FOCUSED_WORKSPACE" = "$1" ]]
}
workspace_list_window_app_names() {
    echo $WORKSPACE_WINDOWS | jq -r ".\"$1\"| select(. != null) | .[] | .\"app-name\"" | sort
}

for ws in $(aerospace list-workspaces --all); do
    icons=$(workspace_list_window_app_names $ws | uniq |\
        while read -r item; do
            $CONFIG_DIR/plugins/icon_map_fn.sh $item
        done | xargs)
    highlight=$(workspace_is_focused $ws || echo "off" && echo "on")
    if workspace_has_windows $ws; then
        cmd+=" --set aerospace_workspace.$ws drawing=on label=\"$icons\""
    elif workspace_is_focused $ws; then
        cmd+=" --set aerospace_workspace.$ws drawing=on label=\"-\" label.highlight=off icon.highlight=off"
    else
        cmd+=" --set aerospace_workspace.$ws drawing=off label=\"\""
    fi
done

eval "$cmd"
# Move whatever possible after eval to make things faster
