---
# Must match the directory name: lowercase letters, digits and hyphens.
name: gaggle
# Claude reads this to decide when to load the skill, so say what it does AND
# when to use it. Only the name and description sit in context until it's used.
description: Use the gaggle command to expose a dev server to localhost on the users laptop. (e.g under server.localhost)
# Optional: tools Claude may use without asking while the skill is active.
allowed-tools: Bash(gaggle *)
---

# Gaggle

You may use gaggle to expose a set of ports within this dev machine to the laptop which has ssh access. The laptop opens a single port and gaggle may operate on that port to expose many services under routes

## Usage

!`gaggle --help`

## Current state

!`gaggle status`

!`gaggle ls`
