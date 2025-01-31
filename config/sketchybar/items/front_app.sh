#!/bin/bash

sketchybar --add item front_app left \
           --set front_app       background.color=$ACCENT_COLOR \
                                 icon.color=$BAR_COLOR \
                                 label.color=$BAR_COLOR \
                                 script="$PLUGIN_DIR/front_app.sh"            \
           --subscribe front_app front_app_switched
