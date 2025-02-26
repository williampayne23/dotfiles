#!/usr/bin/env bash

if [ "$SENDER" = "aerospace_workspace_change" ]; then
    sketchybar \
        --set aerospace_workspace \
            label="$FOCUSED_WORKSPACE"
fi
