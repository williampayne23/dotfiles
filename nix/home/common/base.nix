{
  config,
  pkgs,
  mcp-hub,
  arch,
  ...
}: let
  customPoetry = pkgs.writeShellScriptBin "poetry" ''
    # Python packages come pre built and sometimes assume there are c libraries available on the system
    # Usually because they are but the nix way is to isolate packages by default so we need to provide
    # pointers to the right LD_LIBRARY_PATH to get it to work
    # (Previously I did this for my whole environment but that reasonably breaks things so don't do that)
    # links
    # https://www.reddit.com/r/NixOS/comments/1dexghb/im_just_about_done_with_nixos_how_do_i_get_a/
    # https://discourse.nixos.org/t/what-package-provides-libstdc-so-6/18707/3
    export LD_LIBRARY_PATH=${pkgs.stdenv.cc.cc.lib}/lib/
    export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath [pkgs.zlib]}:$LD_LIBRARY_PATH"
    exec ${pkgs.poetry}/bin/poetry $@
  '';
in {
  nixpkgs.config.allowUnfree = true;
  home.packages = [
    customPoetry
    mcp-hub.packages."${arch}".default
    pkgs.atuin
    pkgs.bat
    pkgs.rustup
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

  home.file = {
    # Pull everything below into common
    ".config/nvim" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/nvim";
      recursive = true;
      # onChange = "${pkgs.neovim}/bin/nvim --headless \"+Lazy! install\" \"+TSUpdateSync\" +qa";
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

    ".config/opencode" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/opencode";
      recursive = true;
    };

    ".config/starship.toml".source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/starship.toml";
  };

  home.sessionVariables = {
    EDITOR = "nvim";
  };

  programs.git = {
    enable = true;
    settings = {
      push.autoSetupRemote = true;
    };
  };

  nix.package = pkgs.nix;
  nix.extraOptions = ''
    experimental-features = nix-command flakes
  '';

  programs.zsh.enable = true;
  programs.zsh.initContent = ''
    PATH=$HOME/bin:$HOME/.local/bin:$PATH
    source $HOME/.config/zsh/zshinit.zsh
  '';

  # Let Home Manager install and manage itself.
  programs.home-manager.enable = true;

  programs.atuin = {
    enable = true;
    settings = {
      auto_sync = true;
      sync_frequency = "5s";
      search_mode = "fuzzy";
      style = "compact";
      inline_height = 20;
      ctrl_n_shortcuts = true;
    };
  };
}
