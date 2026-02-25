{
  description = "home-manager and nix-darwin configuration";

  inputs = {
    # Specify the source of Home Manager and Nixpkgs.
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

  outputs = {
    self,
    nix-darwin,
    nixpkgs,
    home-manager,
    color-schemes,
    mcp-hub,
  }: let
    getConfigSymlink = {
      config,
      path,
      onChange ? null,
    }:
      {
        source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/config/${path}";
      }
      // (
        if onChange != null
        then {inherit onChange;}
        else {}
      );
  in {
    apps."aarch64-darwin".default = let
      pkgs = nixpkgs.legacyPackages."aarch64-darwin";
      init = pkgs.writeShellApplication {
        name = "init";
        runtimeInputs = with pkgs; [git curl bash];
        text = ''
          sudo nix run nix-darwin --extra-experimental-features "nix-command flakes" -- switch --flake ~/dotfiles
          nix run home-manager/master --extra-experimental-features "nix-command flakes" -- switch --flake ~/dotfiles --extra-experimental-features "nix-command flakes"
          /System/Library/PrivateFrameworks/SystemAdministration.framework/Resources/activateSettings -u
        '';
      };
    in {
      type = "app";
      program = "${init}/bin/init";
    };
    apps."x86_64-linux".default = let
      pkgs = nixpkgs.legacyPackages."x86_64-linux";
      init = pkgs.writeShellApplication {
        name = "init";
        text = ''
          nix run home-manager/master --extra-experimental-features "nix-command flakes" -- switch -b backup --flake ~/dotfiles --extra-experimental-features "nix-command flakes"
        '';
      };
    in {
      type = "app";
      program = "${init}/bin/init";
    };

    darwinConfigurations = {
      "Wills-MacBook-Pro" = nix-darwin.lib.darwinSystem {
        system = "aarch64-darwin";
        specialArgs = {inherit self;};
        modules = [./nix/darwin.nix ./nix/darwin/personal.nix];
      };
    };

    homeConfigurations = {
      "ubuntu" = home-manager.lib.homeManagerConfiguration {
        pkgs = nixpkgs.legacyPackages."x86_64-linux";
        modules = [./nix/home/common/base.nix ./nix/home/work.nix];
        extraSpecialArgs = {
          mcp-hub = mcp-hub.packages."x86_64-linux";
          colorSchemes = color-schemes;
          getConfigSymlink = getConfigSymlink;
        };
      };
      "willpayne" = home-manager.lib.homeManagerConfiguration {
        pkgs = nixpkgs.legacyPackages."aarch64-darwin";
        modules = [.nix/home/common/base.nix ./nix/home/personal.nix];
        extraSpecialArgs = {
          mcp-hub = mcp-hub.packages."aarch64-darwin";
          getConfigSymlink = getConfigSymlink;
          colorSchemes = color-schemes;
        };
      };
    };
  };
}
