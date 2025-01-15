{
  config,
  pkgs,
  ...
}: {
  home.packages = [
    pkgs.cargo
    pkgs.poetry
    pkgs.neovim
    pkgs.gh
    pkgs.tmux
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

  home.file = {
    # Pull everything below into common
    ".config/nvim" = {
        source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/nvim";
        recursive = true;
        onChange = "${pkgs.neovim}/bin/nvim --headless \"+Lazy! install\" \"+TSUpdateSync\" +qa";
    };

    ".config/bat" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/bat";
      recursive = true;
      onChange = "${pkgs.bat}/bin/bat cache --build";
    };

    ".config/k9s" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/k9s";
      recursive = true;
    };

    ".config/tmux" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/tmux";
      recursive = true;
    };

    ".config/zsh" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/zsh";
      recursive = true;
    };

    ".config/starship.toml".source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/starship.toml";

  };

  home.sessionVariables = {
    EDITOR = "nvim";
  };

  programs.git = {
    enable = true;
    extraConfig = {
        push.autoSetupRemote = true;
    };
  };

  nix.package = pkgs.nix;
  nix.extraOptions = ''
    experimental-features = nix-command flakes
  '';

  programs.zsh.enable = true;
  programs.zsh.initExtra = ''
    source $HOME/.config/zsh/zshinit.zsh
  '';

 

  # Let Home Manager install and manage itself.
  programs.home-manager.enable = true;
}
