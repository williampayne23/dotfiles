if ! command -v aisitools &> /dev/null; then
    uv tool install git+ssh://git@github.com/AI-Safety-Institute/aisi-inspect-tools.git
fi

mkdir -p "$HOME/.config/aisi"

OPENAI_KEYFILE="$HOME/.config/aisi/openai.key"
if [[ -f "$OPENAI_KEYFILE" ]]; then
    export OPENAI_RESOLVED_KEY=$(cat "$OPENAI_KEYFILE")
else
    export OPENAI_RESOLVED_KEY=$(aisitools override-key $OPENAI_API_KEY)
    echo "$OPENAI_RESOLVED_KEY" > "$OPENAI_KEYFILE"
fi

ANTHROPIC_KEYFILE="$HOME/.config/aisi/anthropic.key"
if [[ -f "$ANTHROPIC_KEYFILE" ]]; then
    export ANTHROPIC_RESOLVED_KEY=$(cat "$ANTHROPIC_KEYFILE")
else
    export ANTHROPIC_RESOLVED_KEY=$(aisitools override-key $ANTHROPIC_API_KEY)
    echo "$ANTHROPIC_RESOLVED_KEY" > "$ANTHROPIC_KEYFILE"
fi
