{
  config,
  lib,
  pkgs,
  mcp-hub,
  getConfigSymlink,
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

  home.file = {
    ".config/nvim" = getConfigSymlink {
      config = config;
      path = "nvim";
    };

    ".config/bat" = getConfigSymlink {
      config = config;
      path = "bat";
      onChange = "${pkgs.bat}/bin/bat cache --build";
    };

    ".config/k9s" = getConfigSymlink {
      config = config;
      path = "k9s";
    };

    ".config/tmux" = getConfigSymlink {
      config = config;
      path = "tmux";
    };

    ".config/zsh" = getConfigSymlink {
      config = config;
      path = "zsh";
    };

    ".config/opencode" = getConfigSymlink {
      config = config;
      path = "opencode";
    };

    ".config/starship.toml" = getConfigSymlink {
      config = config;
      path = "starship.toml";
    };

    ".claude/CLAUDE.md" = getConfigSymlink {
      config = config;
      path = "claude/CLAUDE.md";
    };

    ".claude/settings.json" = getConfigSymlink {
      config = config;
      path = "claude/settings.json";
    };

    ".claude/agents" = getConfigSymlink {
      config = config;
      path = "claude/agents";
    };
  };

  home.activation = {
    install_tmux_plugins = config.lib.dag.entryAfter ["writeBoundary"] ''
      export PATH="${lib.makeBinPath [
        pkgs.tmux
        pkgs.git
        pkgs.gawk
        pkgs.coreutils
        pkgs.bash
        pkgs.gnused
        pkgs.gnugrep
        pkgs.findutils
      ]}:$PATH"

      if [ -x "${config.home.homeDirectory}/.tmux/plugins/tpm/bin/install_plugins" ]; then
        $DRY_RUN_CMD ${config.home.homeDirectory}/.tmux/plugins/tpm/bin/install_plugins || true
      fi
    '';
    install_nvim_plugins = lib.hm.dag.entryAfter ["writeBoundary"] ''
      export PATH="${lib.makeBinPath [
        pkgs.neovim
        pkgs.git
        pkgs.coreutils
        pkgs.curl
        pkgs.gnutar
        pkgs.gzip
      ]}:$PATH"

      $DRY_RUN_CMD ${pkgs.neovim}/bin/nvim --headless "+Lazy! sync" +qa || true
    '';
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

  programs.zsh.envExtra = ''
    # Initialize zoxide for all zsh sessions (including non-interactive)
    if command -v zoxide >/dev/null 2>&1; then
        eval "$(zoxide init zsh)"
    fi
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
