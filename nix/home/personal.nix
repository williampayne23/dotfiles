{
  config,
  pkgs,
  color-schemes,
  ...
}: {
  # Home Manager needs a bit of information about you and the paths it should
  # manage.
  home.username = "willpayne";
  home.homeDirectory = "/Users/willpayne";

  # This value determines the Home Manager release that your configuration is
  # compatible with. This helps avoid breakage when a new Home Manager release
  # introduces backwards incompatible changes.
  #
  # You should not change this value, even if you update Home Manager. If you do
  # want to update the value, then make sure to first check the Home Manager
  # release notes.
  home.stateVersion = "24.05"; # Please read the comment before changing.

  imports = [./common/base.nix];

  nixpkgs.config.allowUnfree = true;

  # The home.packages option allows you to install Nix packages into your
  # environment.
  home.packages = [
    # Is for Mac only GUI packages
    pkgs.raycast
    pkgs.aerospace
    pkgs.jankyborders
    pkgs.sketchybar
    pkgs.ghostty
    pkgs.prismlauncher
  ];

  programs.ghostty = {
    enable = true;
    settings = {
        font-size = 18;
        font-family = "JetBrainsMono Nerd Font";
        font-feature = ["-liga" "-dlig" "-calt"];
        quick-terminal-position = "center";
    };
    extraConfig = builtins.readFile (color-schemes + "/ghostty/catppuccin-frappe");
    keybindings = {
        "super+/" = "toggle_quick_terminal";
    };
  };

  home.file = {
    ".config/aerospace" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/aerospace";
      recursive = true;
      onChange = "${pkgs.aerospace}/bin/aerospace reload-config";
    };

    ".config/sketchybar" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/sketchybar";
      recursive = true;
    };
  };
}
