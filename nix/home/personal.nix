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

  nixpkgs.config.allowUnfree = true;

  # The home.packages option allows you to install Nix packages into your
  # environment.
  home.packages = [
    # Is for Mac only GUI packages
    pkgs.raycast
    pkgs.aerospace
    pkgs.sketchybar
    pkgs.sketchybar-app-font
    pkgs.ghostty
    pkgs.prismlauncher
    pkgs.modrinth-app

    # Should pull out into common config    
    pkgs.cargo
    pkgs.lua5_4_compat
    pkgs.poetry
    pkgs.neovim
    pkgs.gh
    pkgs.tmux
    pkgs.stow
    pkgs.zsh
    pkgs.cmake
    pkgs.fzf
    pkgs.ripgrep
    pkgs.bat
    pkgs.zoxide
    pkgs.starship
    pkgs.atuin
    pkgs.alejandra
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

    # Pull everything below into common
    ".config/nvim" = {
        source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/nvim";
        recursive = true;
        onChange = "${pkgs.neovim}/bin/nvim --headless \"+Lazy! install\" \"+TSUpdateSync\" +qa";
    };

    ".config/bat" = {
      source = ../../config/bat;
      recursive = true;
      onChange = "${pkgs.bat}/bin/bat cache --build";
    };

    ".config/k9s" = {
      source = ../../config/k9s;
      recursive = true;
    };

    ".config/tmux" = {
      source = ../../config/tmux;
      recursive = true;
    };

    ".config/zsh" = {
      source = ../../config/zsh;
      recursive = true;
    };

    ".config/starship.toml".source = ../../config/starship.toml;

  };

  home.sessionVariables = {
    EDITOR = "nvim";
  };

  nix.package = pkgs.nix;
  nix.extraOptions = ''
    experimental-features = nix-command flakes
  '';

  programs.zsh.enable = true;
  programs.zsh.initExtra = ''
    source $HOME/.config/zsh/zshinit.zsh
  '';
  programs.zsh.sessionVariables = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [ pkgs.stdenv.cc.cc pkgs.zlib];
  };

  # Let Home Manager install and manage itself.
  programs.home-manager.enable = true;
}
