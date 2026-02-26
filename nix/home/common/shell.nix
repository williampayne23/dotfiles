# Shell environment: zsh, atuin, zoxide, starship — plus their config symlinks
{ pkgs, liveLink, ... }: {
  home.packages = [ pkgs.starship pkgs.zoxide ];

  home.file.".config/zsh"           = liveLink { path = "zsh"; };
  home.file.".config/starship.toml" = liveLink { path = "starship.toml"; };

  programs.zsh = {
    enable = true;
    # PATH additions + source the main zsh config from the dotfiles symlink
    initContent = ''
      PATH=$HOME/bin:$HOME/.local/bin:$PATH
      source $HOME/.config/zsh/zshinit.zsh
    '';
    # Initialise zoxide in .zshenv so it is available in non-interactive sessions too
    envExtra = ''
      if command -v zoxide >/dev/null 2>&1; then
          eval "$(zoxide init zsh)"
      fi
    '';
  };

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
