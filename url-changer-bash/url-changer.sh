#!/bin/bash
# Description: Change a URL from twitter.com to nitter.net or from youtube.com or youtu.be to piped.mha.fi or from nitter.net to twitter.com or from piped.mha.fi to youtube.com
#ask which piped or nitter instance you want to use
# Piped instances: https://github.com/TeamPiped/Piped/wiki/Instances
# Nitter instances: https://github.com/zedeus/nitter/wiki/Instances
# save the asked instances to $HOME/.config/modified-urls/config.json and check if the file exists before asking the user for the instances

# Define the config file path
config_file="$HOME/.config/modified-urls/config.json"

# Create the config file if it doesn't exist
if [ ! -f "$config_file" ]; then
    mkdir -p "$(dirname "$config_file")"
    echo '{
    "nitter": "",
    "piped": ""
}' > "$config_file"
fi

# Ask for the nitter instance
echo "Which instance do you want to use for nitter?"
echo "Nitter instances can be found here: https://github.com/zedeus/nitter/wiki/Instances"
echo "If you want to use the default instance, just press enter"
read -r nitter

# Ask for the piped instance
echo "Which instance do you want to use for piped?"
echo "Piped instances can be found here: https://github.com/TeamPiped/Piped/wiki/Instances"
echo "If you want to use the default instance, just press enter"
read -r piped

# Save the instances to the config file
jq --arg n "$nitter" --arg p "$piped" '.nitter = $n | .piped = $p' "$config_file" > "$config_file.tmp" && mv "$config_file.tmp" "$config_file"

# Replace twitter.com with nitter.net and print the modified URL

# Prompt the user for a URL
read -rp "Enter a URL: " url

# Extract the domain from the URL and remove "www." if present (for youtube.com)
domain=$(echo "$url" | awk -F/ '{print $3}' | sed 's/^www\.//')

# Check if the domain is twitter.com
if [ "$domain" = "twitter.com" ]; then
    # Replace twitter.com with the configured nitter instance and print the modified URL
    nitter_instance=$(jq -r '.nitter' "$config_file")
    modified_url=$(echo "$url" | sed "s|twitter.com|$nitter_instance|")
    echo "Modified URL: $modified_url"
# Check if the domain is youtube.com or youtu.be
elif [ "$domain" = "youtube.com" ] || [ "$domain" = "youtu.be" ]; then
    # Replace youtube.com or youtu.be with the configured piped instance and print the modified URL
    piped_instance=$(jq -r '.piped' "$config_file")
    modified_url=$(echo "$url" | sed "s|youtu\.be/|youtube.com/watch?v=|; s|youtube.com/watch?v=|$piped_instance/watch?v=|; s|^https://www.|https://|")
    echo "Modified URL: $modified_url"
# Check if the domain is nitter.net
elif [ "$domain" = "nitter.net" ]; then
    # Replace nitter.net with twitter.com and print the modified URL
    modified_url=$(echo "$url" | sed 's|nitter.net|
