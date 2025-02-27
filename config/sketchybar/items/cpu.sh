#!/bin/bash

sketchybar --add item cpu right \
           --set cpu  update_freq=2 \
                      icon=􀧓  \
                      popup.background.drawing=on\
                      popup.background.color=$BACKGROUND\
                      popup.background.corner_radius=10\
                      script="$PLUGIN_DIR/cpu.sh" \
            --subscribe cpu mouse.entered mouse.exited\
            --add graph cpu_g popup.cpu 50 \
            --set cpu_g background.height=20 \
                        icon=􀧓  \
            --add graph ram_g popup.cpu 50 \
            --set ram_g background.height=20 \
                        icon=
