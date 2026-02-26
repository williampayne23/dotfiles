# Common home-manager configuration — aggregates all shared modules
{ config, pkgs, ... }: {
  imports = [
    ./packages.nix
    ./shell.nix
    ./editor.nix
    ./terminal.nix
    ./git.nix
  ];

  # Shared helper: creates an out-of-store symlink into ~/dotfiles/config/<path>
  # so edits to config files take effect immediately without re-running home-manager.
  # Usage:  home.file.".config/foo" = liveLink { path = "foo"; };
  _module.args.liveLink = { path, onChange ? null }:
    { source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/${path}"; }
    // (if onChange != null then { inherit onChange; } else {});

  nixpkgs.config.allowUnfree = true;

  nix.package = pkgs.nix;
  nix.extraOptions = ''
    experimental-features = nix-command flakes
  '';

  programs.home-manager.enable = true;
}
