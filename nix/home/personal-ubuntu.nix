{
  config,
  pkgs,
  ...
}: {
  home.username = "ubuntu";
  home.homeDirectory = "/home/ubuntu";

  home.stateVersion = "24.05";

  home.packages = [
    pkgs.cloudflared
    pkgs.kubectl
    pkgs.awscli2
    pkgs.tmux
  ];

  home.sessionPath = [
    "/snap/bin"
  ];

  # Source ~/.claude-env if it exists (credentials pushed by Terraform SCP)
  programs.zsh.initExtra = ''
    [[ -f ~/.claude-env ]] && source ~/.claude-env
  '';
}
