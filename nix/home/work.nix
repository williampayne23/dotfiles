{
  config,
  lib,
  pkgs,
  ...
}: {
  # Home Manager needs a bit of information about you and the paths it should
  # manage.
  home.username = "ubuntu";
  home.homeDirectory = "/home/ubuntu";

  home.stateVersion = "24.05"; # Please read the comment before changing.

  home.sessionPath = [
    "/snap/bin"
  ];

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
