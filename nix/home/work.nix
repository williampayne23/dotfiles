{
  config,
  pkgs,
  lib,
  ...
}: {
  # Home Manager needs a bit of information about you and the paths it should
  # manage.
  home.username = "ubuntu";
  home.homeDirectory = "/home/ubuntu";

  home.stateVersion = "24.05"; # Please read the comment before changing.

  imports =
    [
      ./common/base.nix
    ];

  home.packages = [
    pkgs.quarto
  ];

  home.sessionPath = [
    "/snap/bin"
  ];
}
