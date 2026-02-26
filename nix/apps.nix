# Setup apps — run with: nix run ~/dotfiles
# These bootstrap nix-darwin and/or home-manager on a fresh machine.
{ nixpkgs }: let
  mkApp = system: { runtimeInputs ? [], text }: let
    pkgs = nixpkgs.legacyPackages.${system};
    init = pkgs.writeShellApplication {
      name = "init";
      inherit runtimeInputs text;
    };
  in { type = "app"; program = "${init}/bin/init"; };

  extraFeatures = ''--extra-experimental-features "nix-command flakes"'';
in {
  "aarch64-darwin".default = mkApp "aarch64-darwin" {
    runtimeInputs = let pkgs = nixpkgs.legacyPackages."aarch64-darwin"; in
      with pkgs; [git curl bash];
    text = ''
      sudo nix run nix-darwin ${extraFeatures} -- switch --flake ~/dotfiles
      nix run home-manager/master ${extraFeatures} -- switch --flake ~/dotfiles ${extraFeatures}
      /System/Library/PrivateFrameworks/SystemAdministration.framework/Resources/activateSettings -u
    '';
  };

  "x86_64-linux".default = mkApp "x86_64-linux" {
    text = ''
      nix run home-manager/master ${extraFeatures} -- switch -b backup --flake ~/dotfiles ${extraFeatures}
    '';
  };
}
