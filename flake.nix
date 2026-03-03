{
  description = "home-manager and nix-darwin configuration";

  inputs = {
    mcp-hub.url = "github:ravitemer/mcp-hub";
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    nix-darwin.url = "github:LnL7/nix-darwin";
    nix-darwin.inputs.nixpkgs.follows = "nixpkgs";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    color-schemes = {
      url = "github:mbadolato/iTerm2-Color-Schemes";
      flake = false;
    };
  };

  outputs = { self, nix-darwin, nixpkgs, home-manager, color-schemes, mcp-hub }: let
    # Creates an out-of-store symlink from ~/.config/<path> to ~/dotfiles/config/<path>
    # so edits to config files take effect immediately without re-running home-manager.
    # Modules receive this via extraSpecialArgs and call it as: liveLink config { path = "foo"; }
    liveLink = config: { path, onChange ? null }:
      { source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/${path}"; }
      // (if onChange != null then { inherit onChange; } else {});

    homeArgs = system: {
      mcp-hub = mcp-hub.packages.${system};
      colorSchemes = color-schemes;
      inherit liveLink;
    };
  in {
    apps = import ./nix/apps.nix { inherit nixpkgs; };

    darwinConfigurations."Wills-MacBook-Pro" = nix-darwin.lib.darwinSystem {
      system = "aarch64-darwin";
      specialArgs = { inherit self; };
      modules = [./nix/darwin ./nix/darwin/personal.nix];
    };

    homeConfigurations = {
      "ubuntu" = home-manager.lib.homeManagerConfiguration {
        pkgs = nixpkgs.legacyPackages."x86_64-linux";
        modules = [./nix/home/common ./nix/home/work.nix];
        extraSpecialArgs = homeArgs "x86_64-linux";
      };
      "willpayne" = home-manager.lib.homeManagerConfiguration {
        pkgs = nixpkgs.legacyPackages."aarch64-darwin";
        modules = [./nix/home/common ./nix/home/personal.nix];
        extraSpecialArgs = homeArgs "aarch64-darwin";
      };
    };
  };
}
