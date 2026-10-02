{
  config,
  lib,
  pkgs,
  liveLink,
  skillLinks,
  ...
}: let
  # Bump this commit to update Gaggle on the next Home Manager switch.
  gaggleRev = "5be2fee0b399137ebb8273b78ab7fce14e893de4";
  installGaggle = pkgs.writeShellApplication {
    name = "install-gaggle";
    runtimeInputs = [pkgs.coreutils pkgs.gh pkgs.gnutar pkgs.gzip pkgs.go];
    text = ''
      bin_dir="$HOME/.local/bin"
      state_dir="''${XDG_STATE_HOME:-$HOME/.local/state}/gaggle"
      if [[ -x "$bin_dir/gaggle" && -f "$state_dir/revision" ]] &&
         [[ "$(cat "$state_dir/revision")" == "${gaggleRev}" ]]; then
        exit 0
      fi

      mkdir -p "$bin_dir" "$state_dir"
      # Stage beside the destination so replacement is atomic after a successful build.
      build_dir=$(mktemp -d "$bin_dir/.gaggle-build.XXXXXX")
      trap 'rm -rf "$build_dir"' EXIT

      gh api repos/AI-Safety-Institute/gaggle/tarball/${gaggleRev} > "$build_dir/source.tar.gz"
      mkdir "$build_dir/source"
      tar -xzf "$build_dir/source.tar.gz" --strip-components=1 -C "$build_dir/source"
      cd "$build_dir/source"
      # Gaggle uses only the standard library; no further network access is needed.
      CGO_ENABLED=0 GOTOOLCHAIN=local GOPROXY=off GOSUMDB=off \
        go build -trimpath -o "$build_dir/gaggle" .
      mv -f "$build_dir/gaggle" "$bin_dir/gaggle"
      printf '%s\n' '${gaggleRev}' > "$state_dir/revision"
    '';
  };
in {
  # Home Manager needs a bit of information about you and the paths it should
  # manage.
  home.username = "ubuntu";
  home.homeDirectory = "/home/ubuntu";

  home.stateVersion = "24.05"; # Please read the comment before changing.

  # Extra global Claude instructions for AISI machines; ~/.claude/rules/*.md is
  # loaded alongside ~/.claude/CLAUDE.md.
  home.file =
    {
      ".claude/rules/aisi.md" = liveLink config {path = "claude/rules/aisi.md";};
    }
    // skillLinks config "aisi";

  home.sessionPath = [
    "/snap/bin"
    "${config.home.homeDirectory}/.local/bin"
  ];

  # Fetch private sources only after the work GitHub credentials have been installed.
  home.activation.install_gaggle = config.lib.dag.entryAfter ["pull_claude_creds"] ''
    run ${installGaggle}/bin/install-gaggle
  '';

  home.activation.pull_claude_creds = config.lib.dag.entryAfter ["writeBoundary"] ''
    export PATH="${lib.makeBinPath [
      pkgs.tmux
      pkgs.git
      pkgs.gawk
      pkgs.coreutils
      pkgs.bash
      pkgs.gnused
      pkgs.gnugrep
      pkgs.findutils
      pkgs.awscli
      pkgs.claude-code
    ]}:$PATH"
    mkdir -p ~/.config/gh
    aws secretsmanager get-secret-value \
      --secret-id "users/$AISI_PLATFORM_USER/gh-auth-credentials" \
      --query SecretString --output text > ~/.config/gh/hosts.yml
    claude mcp add --transport http --scope user github https://api.githubcopilot.com/mcp -H "Authorization: Bearer $(gh auth token)" || true

    claude mcp add --transport http --scope user linear-server https://mcp.linear.app/mcp || true

    aws secretsmanager get-secret-value \
      --secret-id "users/$AISI_PLATFORM_USER/claude-code-mcp-credentials" \
      --query SecretString --output text > ~/.claude/.credentials.json
  '';
}
