# Tmux: package, config symlink, TPM plugin installer on activation
{ config, lib, pkgs, liveLink, ... }: {
  home.packages = [ pkgs.tmux ];

  home.file.".config/tmux" = liveLink { path = "tmux"; };

  home.activation.install_tmux_plugins = config.lib.dag.entryAfter ["writeBoundary"] ''
    export PATH="${lib.makeBinPath [
      pkgs.tmux
      pkgs.git
      pkgs.gawk
      pkgs.coreutils
      pkgs.bash
      pkgs.gnused
      pkgs.gnugrep
      pkgs.findutils
    ]}:$PATH"

    if [ -x "${config.home.homeDirectory}/.tmux/plugins/tpm/bin/install_plugins" ]; then
      $DRY_RUN_CMD ${config.home.homeDirectory}/.tmux/plugins/tpm/bin/install_plugins || true
    fi
  '';
}
