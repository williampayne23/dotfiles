{pkgs, ...}:
let 
    writeShellApplication = pkgs.writeShellApplication;
    make_named_plist = {
        name,
        text,
        runtimeInputs,
        props,
        }:
        {
            serviceConfig = {
                Program = "${writeShellApplication {
                    inherit name;
                    inherit runtimeInputs;
                    inherit text;
                }}/bin/${name}";
            } // props;
        };
in
    {
    homebrew.casks =
        [
            "steam"
            "cleanmymac"
            "font-sf-pro"
            "sf-symbols"
        ];
    homebrew.brews = [];
    nix.settings.trusted-users = ["will"];

    launchd = {
        user = {
            agents = {
                borders = make_named_plist {
                    name = "borders";
                    text = "borders active_color=0xffe1e3e4 inactive_color=0xff494d64 width=5.0";
                    runtimeInputs = [pkgs.jankyborders];
                    props = {
                        KeepAlive = true;
                        RunAtLoad = true;
                        StandardOutPath = "/tmp/borders_will.out.log";
                    };
                };
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
