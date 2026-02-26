# Config file symlinks — live links into ~/dotfiles/config/ so edits take effect immediately
{ config, pkgs, ... }: let
  # Creates an out-of-store symlink from ~/.config/<path> to ~/dotfiles/config/<path>.
  # Pass onChange to run a command when the symlink target is modified on activation.
  liveLink = { path, onChange ? null }:
    { source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/${path}"; }
    // (if onChange != null then { inherit onChange; } else {});
in {
  home.file = {
    ".config/nvim"          = liveLink { path = "nvim"; };
    ".config/bat"           = liveLink { path = "bat"; onChange = "${pkgs.bat}/bin/bat cache --build"; };
    ".config/k9s"           = liveLink { path = "k9s"; };
    ".config/tmux"          = liveLink { path = "tmux"; };
    ".config/zsh"           = liveLink { path = "zsh"; };
    ".config/opencode"      = liveLink { path = "opencode"; };
    ".config/starship.toml" = liveLink { path = "starship.toml"; };
    ".claude/CLAUDE.md"     = liveLink { path = "claude/CLAUDE.md"; };
    ".claude/settings.json" = liveLink { path = "claude/settings.json"; };
    ".claude/agents"        = liveLink { path = "claude/agents"; };
  };
}
