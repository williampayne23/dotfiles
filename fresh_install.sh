sh <(curl -L https://nixos.org/nix/install) --daemon --yes

if [ -e '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh' ]; then
  . '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'
fi

nix run home-manager --extra-experimental-features "nix-command flakes" -- switch --flake .#ubuntu --extra-experimental-features "nix-command flakes"
