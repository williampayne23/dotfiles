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
      ".config/caddy/Caddyfile" = liveLink config {path = "caddy/Caddyfile";};
      ".config/caddy/aliases" = liveLink config {path = "caddy/aliases";};
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

  # The provisioned ~/.ssh/config is group-writable, which Nix's openssh
  # rejects ("Bad owner or permissions"). Ubuntu's ssh tolerates it.
  home.activation.fix_ssh_config_perms = config.lib.dag.entryAfter ["writeBoundary"] ''
    [ -f ~/.ssh/config ] && run chmod go-w ~/.ssh/config || true
  '';

  # Canopy: live GitHub-style diff viewer over every repo under $HOME.
  # Fetched from the private AISI repo over ssh, so git/ssh must be on PATH.
  systemd.user.services.canopy = {
    Unit = {
      Description = "Canopy diff viewer";
      After = ["network-online.target"];
    };
    Service = {
      Type = "simple";
      WorkingDirectory = config.home.homeDirectory;
      Environment = [
        "PATH=${lib.makeBinPath [pkgs.uv pkgs.git pkgs.openssh pkgs.coreutils]}:${config.home.homeDirectory}/.local/bin"
      ];
      ExecStart = "${pkgs.uv}/bin/uvx --from git+ssh://git@github.com/AI-Safety-Institute/canopy@latest canopy --port 7777 ${config.home.homeDirectory}";
      Restart = "on-failure";
      RestartSec = 10;
    };
    Install.WantedBy = ["default.target"];
  };

  # Caddy: reach any local port from the laptop through one ssh forward
  # (http://<port>.localhost:8000). See config/caddy/Caddyfile.
  systemd.user.services.caddy-ports = {
    Unit = {
      Description = "Port-in-subdomain reverse proxy";
      After = ["network.target"];
    };
    Service = {
      ExecStart = "${pkgs.caddy}/bin/caddy run --config %h/.config/caddy/Caddyfile --adapter caddyfile";
      # The Caddyfile is a live symlink into the dotfiles checkout; a switch
      # won't see edits to it, so reload with: systemctl --user restart caddy-ports
      Restart = "on-failure";
      RestartSec = 5;
    };
    Install.WantedBy = ["default.target"];
  };

  # Start/restart changed user services on `home-manager switch`.
  systemd.user.startServices = "sd-switch";

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
