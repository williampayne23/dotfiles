ZELLIJ_AUTO_ATTACH=true
# ZELLIJ_AUTO_EXIT=true
function ze() {
    if [[ -z "$ZELLIJ" ]]; then
        if [[ "$ZELLIJ_AUTO_ATTACH" == "true" ]]; then
            zellij attach -c Main
        else
            zellij
        fi

        if [[ "$ZELLIJ_AUTO_EXIT" == "true" ]]; then
            exit
        fi
    fi
}
