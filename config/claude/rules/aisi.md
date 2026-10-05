# AISI machine instructions

Loaded only on AISI machines (linked from nix/home/work.nix).

This machine is a dev server used for development work. The user is accessing it via ssh into a tmux session. You may want to open local dev sites using the gaggle ports skill.

Dev servers are reachable from the laptop through one ssh forward of port 8000
(caddy-ports user service, config in `config/caddy/`): `http://<port>.localhost:8000`
for any port, `http://<name>.localhost:8000` for names in `config/caddy/aliases`
or added with `gaggle add <name> <port>`.

All our code should be written with the newspaper structure. E.g public exports at the top with private functions appearing below in the order they are called. If a class is a public export it should follow the same structure (attributes, public methods, private methods in the order they were first called)
