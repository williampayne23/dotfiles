# Common darwin config
{
  self,
  pkgs,
  ...
}: {
  # List packages installed in system profile. To search by name, run:
  # $ nix-env -qaP | grep wget
  environment.systemPackages = [];
  ids.gids.nixbld = 350;
  nix.package = pkgs.nix;

  # Necessary for using flakes on this system.
  nix.settings.experimental-features = "nix-command flakes";

  # Set Git commit hash for darwin-version.
  system.configurationRevision = self.rev or self.dirtyRev or null;

  # Used for backwards compatibility, please read the changelog before changing.
  # $ darwin-rebuild changelog
  system.stateVersion = 4;

  system.defaults.NSGlobalDomain.KeyRepeat = 2;
  system.defaults.trackpad.TrackpadRightClick = true;
  system.defaults.NSGlobalDomain."com.apple.trackpad.trackpadCornerClickBehavior" = 1;
  system.defaults.NSGlobalDomain.AppleInterfaceStyle = "Dark";
  system.defaults.dock.autohide = true;
    # Empty dock
  system.defaults.dock.persistent-apps = [

    ];
  system.defaults.dock.mru-spaces = false;
  system.defaults.dock.show-recents = false;
  system.defaults.CustomUserPreferences = {
    "com.apple.symbolichotkeys".AppleSymbolicHotKeys."64".enabled = 0;
      "com.raycast.macos".raycastGlobalHotkey = "Command-49";
    };

  programs.zsh.enable = true;
  homebrew.enable = true;
  homebrew.onActivation.cleanup = "uninstall";
  homebrew.taps = [
    "homebrew/services"
  ];

  nixpkgs.config.allowUnfree = true;
  # The platform the configuration will be used on.
  nixpkgs.hostPlatform = "aarch64-darwin";
}
