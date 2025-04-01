{
  config,
  pkgs,
  lib,
  private-repo,
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
    ]
    ++ lib.optional (builtins.pathExists "${private-repo}/hidden_nix_config/work.nix") "${private-repo}/hidden_nix_config/work.nix";

  home.packages = [
  ];

  home.sessionPath = [
    "/snap/bin"
  ];
}
