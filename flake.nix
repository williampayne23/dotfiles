{
  description = "home-manager and nix-darwin configuration";

  inputs = {
    # Specify the source of Home Manager and Nixpkgs.
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    nix-darwin.url = "github:LnL7/nix-darwin";
    nix-darwin.inputs.nixpkgs.follows = "nixpkgs";
    ghostty-hm.url = "github:clo4/ghostty-hm-module";
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
    ghostty-hm,
    color-schemes,
  } @ inputs: let
    mkDarwin = {extraDarwinModules ? {}}:
      nix-darwin.lib.darwinSystem {
        system = "aarch64-darwin";
        specialArgs = {inherit self;};
        modules = [./nix/darwin.nix] ++ extraDarwinModules;
      };
    mkHm = {
      extraModules ? [],
      arch,
    }:
      home-manager.lib.homeManagerConfiguration {
        pkgs = nixpkgs.legacyPackages.${arch};
        modules = [
          # Include so we can configure ghostty
        ]
        ++ extraModules;
        extraSpecialArgs = {color-schemes = color-schemes;};
      };
  in {
    apps."aarch64-darwin".default = let
      pkgs = nixpkgs.legacyPackages."aarch64-darwin";
      init = pkgs.writeShellApplication {
        name = "init";
        runtimeInputs = with pkgs; [git curl bash];
        text = ''
          # bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
          nix run nix-darwin -- switch --flake ~/dotfiles
          nix run home-manager/master -- switch --flake ~/dotfiles
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
          nix run home-manager/master -- switch --flake ~/dotfiles
        '';
      };
    in {
      type = "app";
      program = "${init}/bin/init";
    };
    darwinConfigurations = {
      "Wills-MacBook-Pro" = mkDarwin {
        extraDarwinModules = [./nix/darwin/personal.nix];
      };
    };

    homeConfigurations = {
      "ubuntu" = mkHm {
        extraModules = [./nix/home/work.nix];
        arch = "x86_64-linux";
      };
      "willpayne" = mkHm {
        extraModules = [
            ghostty-hm.homeModules.default
            ./nix/home/personal.nix
        ];
        arch = "aarch64-darwin";
      };
    };
  };
}
