# Git configuration
{ ... }: {
  programs.git = {
    enable = true;
    settings = {
      push.autoSetupRemote = true;
    };
  };
}
