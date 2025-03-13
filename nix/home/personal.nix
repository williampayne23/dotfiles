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

  # The home.packages option allows you to install Nix packages into your
  # environment.
  home.packages = [
    # Is for Mac only GUI packages
    pkgs.raycast
    pkgs.alacritty
    pkgs.aerospace
    pkgs.jankyborders
    pkgs.sketchybar
    # Fonts
    pkgs.sketchybar-app-font
    pkgs.nerd-fonts.jetbrains-mono
  ];


  programs.alacritty = {
        enable = true;
        settings = {
            general.import = [
                "~/dotfiles/config/alacritty/catppuccin-frappe.toml"
            ];
            window = {
                decorations = "Buttonless";
                padding = {
                    x = 5;
                    y = 5;
                };
            };
            font = {
                normal = {
                    family = "JetBrainsMono NF";
                    style = "Regular";
                };
                size = 19;
            };
            keyboard.bindings = [
                {
                    mods = "Control";
                    key = "Space";
                    chars = "\\u0000";
                }
            ];
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
