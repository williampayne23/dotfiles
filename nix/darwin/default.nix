# Common macOS system configuration
{
  self,
  pkgs,
  ...
}: {
  system.primaryUser = "willpayne";
  environment.systemPackages = [];

  ids.gids.nixbld = 350;

  nix.package = pkgs.nix;
  nix.settings.experimental-features = "nix-command flakes";

  system.configurationRevision = self.rev or self.dirtyRev or null;
  system.stateVersion = 4;

  system.defaults.NSGlobalDomain.KeyRepeat = 2;
  system.defaults.trackpad.TrackpadRightClick = true;
  system.defaults.NSGlobalDomain."com.apple.trackpad.trackpadCornerClickBehavior" = 1;
  system.defaults.NSGlobalDomain.AppleInterfaceStyle = "Dark";
  system.defaults.dock.autohide = true;
  system.defaults.dock.persistent-apps = [];
  system.defaults.dock.mru-spaces = false;
  system.defaults.dock.show-recents = false;
  system.defaults.CustomUserPreferences = {
    "com.apple.symbolichotkeys".AppleSymbolicHotKeys."64".enabled = 0;
    "com.raycast.macos".raycastGlobalHotkey = "Command-49";
  };

  programs.zsh.enable = true;

  homebrew.enable = true;
  homebrew.onActivation.cleanup = "uninstall";
  homebrew.taps = ["homebrew/services"];

  nixpkgs.config.allowUnfree = true;
  nixpkgs.hostPlatform = "aarch64-darwin";
}
