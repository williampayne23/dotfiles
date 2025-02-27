#!/bin/bash

CORE_COUNT=$(sysctl -n machdep.cpu.thread_count)
CPU_INFO=$(ps -eo pcpu,user)
CPU_SYS=$(echo "$CPU_INFO" | grep -v $(whoami) | sed "s/[^ 0-9\.]//g" | awk "{sum+=\$1} END {print sum/(100.0 * $CORE_COUNT)}")
CPU_USER=$(echo "$CPU_INFO" | grep $(whoami) | sed "s/[^ 0-9\.]//g" | awk "{sum+=\$1} END {print sum/(100.0 * $CORE_COUNT)}")

CPU_PERCENT="$(echo "$CPU_SYS $CPU_USER" | awk '{printf "%.0f\n", ($1 + $2)*100}')"

sketchybar --set cpu label="$CPU_PERCENT%"

# Popup items

CPU_PROP=$(awk -v cpu=$CPU_PERCENT 'BEGIN {printf "%.2f", cpu/100}')
RAM_PERCENT=$(memory_pressure | grep "System-wide memory free percentage" | awk '{print (100-$5)}')
CPU_PROP=$(awk -v ram=$RAM_PERCENT 'BEGIN {printf "%.2f", ram/100}')
sketchybar --push cpu_g $CPU_PROP\
           --set cpu_g label="$CPU_PERCENT%"\
           --push ram_g $RAM_PROP\
           --set ram_g label="$RAM_PERCENT%"


if [ $SENDER = "mouse.entered" ]; then
    sketchybar  --set cpu popup.drawing=on
elif [ $SENDER = "mouse.exited" ]; then
    sketchybar --set cpu popup.drawing=off
fi
