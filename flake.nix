{
  description = "home-manager and nix-darwin configuration";

  inputs = {
    # Specify the source of Home Manager and Nixpkgs.
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
    # For private work configurations which shouldn't be exposed in this repo
    # Local and remote are used to allow for local development
    # (Local will be used by default)
    private-repo = {
      url = "path:/home/ubuntu/scratchpad";
      flake = false;
    };
  };

  outputs = {
    self,
    nix-darwin,
    nixpkgs,
    home-manager,
    color-schemes,
    private-repo,
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
        modules =
          [
            # Include so we can configure ghostty
          ]
          ++ extraModules;
        extraSpecialArgs = inputs // {inherit private-repo;};
      };
  in {
    apps."aarch64-darwin".default = let
      pkgs = nixpkgs.legacyPackages."aarch64-darwin";
      init = pkgs.writeShellApplication {
        name = "init";
        runtimeInputs = with pkgs; [git curl bash];
        text = ''
          # bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
          nix run nix-darwin --extra-experimental-features "nix-command flakes" -- switch --flake ~/dotfiles
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
          if [ -d "/home/ubuntu/scratchpad" ]; then
            nix flake update --update-input private-repo
          fi
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
          ./nix/home/personal.nix
        ];
        arch = "aarch64-darwin";
      };
    };
  };
}
