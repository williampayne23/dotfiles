# Wills Dotfiles

Use nix home-manager to install from the flake

Setup nix if it isn't already
```
sh <(curl -L https://nixos.org/nix/install) --daemon --yes

if [ -e '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh' ]; then
  . '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'
fi
```

Then run the command
```
nix run home-manager --extra-experimental-features "nix-command flakes" -- switch --flake .#ubuntu --extra-experimental-features "nix-command flakes"
```

## TODO:
- [ ] Zoxide + tmux path switcher
- [ ] Harpoon for tmux file paths
