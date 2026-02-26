# Core packages installed on all hosts
{ pkgs, mcp-hub, ... }: let
  # Python packages are sometimes pre-built against C libraries not available
  # in the nix sandbox. This wrapper patches LD_LIBRARY_PATH so poetry-managed
  # environments can find stdenv and zlib at runtime.
  # See: https://discourse.nixos.org/t/what-package-provides-libstdc-so-6/18707
  customPoetry = pkgs.writeShellScriptBin "poetry" ''
    export LD_LIBRARY_PATH=${pkgs.stdenv.cc.cc.lib}/lib/
    export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath [pkgs.zlib]}:$LD_LIBRARY_PATH"
    exec ${pkgs.poetry}/bin/poetry $@
  '';
in {
  home.packages = [
    customPoetry
    mcp-hub.default
    pkgs.atuin
    pkgs.bat
    pkgs.cargo
    pkgs.cmake
    pkgs.fd
    pkgs.fzf
    pkgs.gh
    pkgs.neovim
    pkgs.nodejs_24
    pkgs.claude-code
    pkgs.opencode
    pkgs.ripgrep
    pkgs.starship
    pkgs.tree-sitter
    pkgs.tmux
    pkgs.uv
    pkgs.zoxide
    pkgs.zsh
  ];
}
