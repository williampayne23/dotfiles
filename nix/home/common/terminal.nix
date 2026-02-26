# Tmux: run TPM plugin installer on activation (TPM must be bootstrapped manually first)
{ config, lib, pkgs, ... }: {
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
