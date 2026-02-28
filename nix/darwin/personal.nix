# Personal macOS additions: Homebrew casks and machine-specific settings
{ ... }: {
  homebrew.casks = [
    "steam"
    "cleanmymac"
    "font-sf-pro"
    "sf-symbols"
    "modrinth"
    "obsidian"
    "unity-hub"
    "visual-studio"
  ];

  nix.settings.trusted-users = ["will"];
}
