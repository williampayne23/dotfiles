{...}: let
in {
  homebrew.casks =
    [
      "ghostty"
    ];
  homebrew.brews = [];
  nix.settings.trusted-users = ["will"];
}
