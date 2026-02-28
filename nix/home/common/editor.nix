# Neovim: package, config symlink, default editor, headless plugin sync on activation
{ config, lib, pkgs, liveLink, ... }: {
  home.packages = [ pkgs.neovim pkgs.tree-sitter ];

  home.sessionVariables.EDITOR = "nvim";

  home.file.".config/nvim" = liveLink config { path = "nvim"; };

  home.activation.install_nvim_plugins = lib.hm.dag.entryAfter ["writeBoundary"] ''
    export PATH="${lib.makeBinPath [
      pkgs.neovim
      pkgs.git
      pkgs.coreutils
      pkgs.curl
      pkgs.gnutar
      pkgs.gzip
    ]}:$PATH"

    $DRY_RUN_CMD ${pkgs.neovim}/bin/nvim --headless "+Lazy! sync" +qa || true
  '';
}
