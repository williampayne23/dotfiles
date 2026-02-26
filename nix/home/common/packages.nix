# Core CLI packages — each entry owns its package and config symlink
{ pkgs, mcp-hub, liveLink, ... }: let
  # Python packages are sometimes pre-built against C libraries not available
  # in the nix sandbox. This wrapper patches LD_LIBRARY_PATH so poetry-managed
  # environments can find stdenv and zlib at runtime.
  # See: https://discourse.nixos.org/t/what-package-provides-libstdc-so-6/18707
  customPoetry = pkgs.writeShellScriptBin "poetry" ''
    export LD_LIBRARY_PATH=${pkgs.stdenv.cc.cc.lib}/lib/
    export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath [pkgs.zlib]}:$LD_LIBRARY_PATH"
    exec ${pkgs.poetry}/bin/poetry $@
  '';
in {
  home.packages = [
    customPoetry
    mcp-hub.default
    pkgs.bat
    pkgs.cargo
    pkgs.cmake
    pkgs.fd
    pkgs.fzf
    pkgs.gh
    pkgs.nodejs_24
    pkgs.claude-code
    pkgs.opencode
    pkgs.ripgrep
    pkgs.uv
  ];

  home.file = {
    ".config/bat"      = liveLink { path = "bat"; onChange = "${pkgs.bat}/bin/bat cache --build"; };
    ".config/k9s"      = liveLink { path = "k9s"; };
    ".config/opencode" = liveLink { path = "opencode"; };

    ".claude/CLAUDE.md"     = liveLink { path = "claude/CLAUDE.md"; };
    ".claude/settings.json" = liveLink { path = "claude/settings.json"; };
    ".claude/agents"        = liveLink { path = "claude/agents"; };
  };
}
