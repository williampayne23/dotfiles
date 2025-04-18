{pkgs, ...}: let
  writeShellApplication = pkgs.writeShellApplication;
  make_named_plist = {
    name,
    text,
    runtimeInputs,
    props,
  }: {
    serviceConfig =
      {
        Program = "${writeShellApplication {
          inherit name;
          inherit runtimeInputs;
          inherit text;
        }}/bin/${name}";
      }
      // props;
  };
in {
  homebrew.casks = [
    "steam"
    "cleanmymac"
    "font-sf-pro"
    "sf-symbols"
    "modrinth"
    "obsidian"
  ];
  homebrew.brews = [];
  nix.settings.trusted-users = ["will"];

  launchd = {
    user = {
      agents = {
        sketchybar = make_named_plist {
          name = "sketchybar";
          text = "sketchybar";
          runtimeInputs = [pkgs.sketchybar pkgs.aerospace];
          props = {
            KeepAlive = true;
            RunAtLoad = true;
            StandardOutPath = "/tmp/skeychybat_will.out.log";
          };
        };
      };
    };
  };
}
