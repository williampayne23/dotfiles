# This file will only run on AISI research platform ec2 instances
if [[ -z "$AISI_PLATFORM_USER" ]]; then
    return 0
fi

ecr_auth() {
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    aws ecr get-login-password --region ${AWS_DEFAULT_REGION} |
        docker login --username AWS --password-stdin \
            ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com
}

get_key() {
    if [[ "$1" == "anthropic" ]]; then
        local _api_key_var=$ANTHROPIC_API_KEY
    elif [[ "$1" == "openai" ]]; then
        local _api_key_var=$OPENAI_API_KEY
    else
        echo "Usage: get_key [anthropic|openai]"
        return 1
    fi
    # $1 = anthropic or openai
    local _cache_file="$HOME/.cache/${1}_raw_api_key"
    local _cache_timestamp_file="$HOME/.cache/${1}_raw_api_key_timestamp"
    local _cache_duration=3600 # 1 hour in seconds

    # Create cache directory if it doesn't exist
    mkdir -p "$(dirname "$_cache_file")"

    # Check if cache is valid
    local _should_refresh=true
    if [[ -f "$_cache_file" ]] && [[ -f "$_cache_timestamp_file" ]]; then
        local _last_update=$(cat "$_cache_timestamp_file" 2>/dev/null || echo 0)
        local _current_time=$(date +%s)
        if ((_current_time - _last_update < _cache_duration)); then
            _should_refresh=false
        fi
    fi

    # Refresh cache if needed
    if $_should_refresh; then
        local _new_key=$(aisitools override-key $_api_key_var)
        echo "$_new_key" >"$_cache_file"
        date +%s >"$_cache_timestamp_file"
        echo $_new_key
    else
        cat "$_cache_file"
    fi
}

_get_key_autocomplete() {
    local _keys=("anthropic" "openai")
    COMPREPLY=($(compgen -W "${_keys[*]}" -- "${COMP_WORDS[1]}"))
}

complete -F _get_key_autocomplete get_key

# Generate a claude key for claude code from api_key_proxy
claudekey() {
    export ANTHROPIC_API_KEY=$(get_key anthropic)
}

# Generate a claude key for claude code from api_key_proxy
oaikey() {
    export OPENAI_RAW_API_KEY=$(get_key openai)
}

claudekey
oaikey

export ANTHROPIC_MODEL=claude-opus-4-20250514
