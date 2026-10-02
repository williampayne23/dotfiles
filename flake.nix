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

    # Links each skill directory in config/claude/skills/<set>/ into ~/.claude/skills/
    # so several sets (common + home, common + aisi) can share one skills folder.
    # Skill contents are live; adding or removing a skill needs a home-manager switch.
    skillLinks = config: set: let
      lib = nixpkgs.lib;
      dir = ./config/claude/skills + "/${set}";
      entries = if builtins.pathExists dir then builtins.readDir dir else {};
    in
      lib.mapAttrs'
      (name: _: lib.nameValuePair ".claude/skills/${name}" (liveLink config {path = "claude/skills/${set}/${name}";}))
      (lib.filterAttrs (_: type: type == "directory") entries);

    homeArgs = system: {
      mcp-hub = mcp-hub.packages.${system};
      colorSchemes = color-schemes;
      inherit liveLink skillLinks;
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
      "personal-ubuntu" = home-manager.lib.homeManagerConfiguration {
        pkgs = nixpkgs.legacyPackages."x86_64-linux";
        modules = [./nix/home/common ./nix/home/personal-ubuntu.nix];
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
