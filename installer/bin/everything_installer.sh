# Next:
# Check the machine you're on
# If it's Mac install brew
# If it's Linux check if apt-get is installed
# Combine all json in .config/installer
# Find all entries which aren't marked as lazy or extra
# Install all of them
#   Check if it's installed, if there's a command property that's the command to check
#   If this it has dependencies, install them first
#   If there's no insall property install with apt-get/brew
#   If there's an install property run it
#   If there's an after property run it
