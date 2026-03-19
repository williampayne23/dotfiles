{
  config,
  pkgs,
  ...
}: let
  sessionLauncherPython = pkgs.python3.withPackages (ps: [
    ps.fastapi
    ps.uvicorn
  ]);
in {
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

  # Session launcher API systemd service
  systemd.user.services.session-launcher = {
    Unit = {
      Description = "Claude Remote Control Session Launcher API";
      After = ["network.target"];
    };
    Service = {
      Type = "simple";
      ExecStart = "${sessionLauncherPython}/bin/uvicorn main:app --host 127.0.0.1 --port 8585";
      WorkingDirectory = "${config.home.homeDirectory}/homelab/session-launcher";
      Restart = "on-failure";
      RestartSec = 5;
      Environment = "PATH=${config.home.homeDirectory}/.nix-profile/bin:/usr/local/bin:/usr/bin:/bin";
    };
    Install = {
      WantedBy = ["default.target"];
    };
  };
}
