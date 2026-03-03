# Common home-manager configuration — aggregates all shared modules
{ pkgs, ... }: {
  imports = [
    ./packages.nix
    ./shell.nix
    ./editor.nix
    ./terminal.nix
    ./git.nix
  ];

  nixpkgs.config.allowUnfree = true;

  nix.package = pkgs.nix;
  nix.extraOptions = ''
    experimental-features = nix-command flakes
  '';

  programs.home-manager.enable = true;
}
