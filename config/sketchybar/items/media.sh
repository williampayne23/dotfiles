#!/bin/bash

sketchybar --add item media center \
           --set media label.color=$ACCENT_COLOR \
                       label.max_chars=120 \
                       scroll_texts=on \
                       icon=􀑪             \
                       script="$PLUGIN_DIR/media.sh" \
           --subscribe media media_change
