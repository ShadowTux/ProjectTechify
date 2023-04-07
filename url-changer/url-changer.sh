#!/bin/bash
# Description: Change a URL from twitter.com to nitter.net or from youtube.com or youtu.be to piped.mha.fi or from nitter.net to twitter.com or from piped.mha.fi to youtube.com
#ask witch piped or nitter instance you want to use
# Piped instances: https://github.com/TeamPiped/Piped/wiki/Instances
# Nitter instances: https://github.com/zedeus/nitter/wiki/Instances
# save the asked instances to $HOME/.config/modified-urls/config.json and check if the file exists before asking the user for the instances
#create a config file if it doesn't exist
if [ ! -f "$HOME/.config/modified-urls/config.json" ]; then
    mkdir -p "$HOME/.config/modified-urls"
    echo "{
    \"nitter\": \"\",
    \"piped\": \"\"
}" > "$HOME/.config/modified-urls/config.json"
fi

echo "Which instance do you want to use for nitter?"
echo "Nitter instances can be found here: https://github.com/zedeus/nitter/wiki/Instances"
echo "If you want to use the default instance, just press enter"
read nitter
echo "Which instance do you want to use for piped?"
echo "Piped instances can be found here: https://github.com/TeamPiped/Piped/wiki/Instances"
echo "If you want to use the default instance, just press enter"
read piped
# Replace twitter.com with nitter.net and print the modified URL

# Prompt the user for a URL
read -p "Enter a URL: " url

# Extract the domain from the URL and remove "www." if present (for youtube.com)
domain=$(echo "$url" | awk -F/ '{print $3}' | sed 's/^www\.//')

# Check if the domain is twitter.com
if [ "$domain" = "twitter.com" ]; then
    # Replace twitter.com with read nitter instance and print the modified URL
    modified_url=$(echo "$url" | sed 's|twitter.com|nitter.net|')
    echo "Modified URL: $modified_url"
# Check if the domain is youtube.com or youtu.be
elif [ "$domain" = "youtube.com" ] || [ "$domain" = "youtu.be" ]; then
    # Replace youtube.com or youtu.be with piped.mha.fi and print the modified URL
    modified_url=$(echo "$url" | sed 's|youtu\.be/|youtube.com/watch?v=|; s|youtube.com/watch?v=|piped.mha.fi/watch?v=|; s|^https://www.|https://|')
    echo "Modified URL: $modified_url"
# Check if the domain is nitter.net
elif [ "$domain" = "nitter.net" ]; then
    # Replace nitter.net with twitter.com and print the modified URL
    modified_url=$(echo "$url" | sed 's|nitter.net|twitter.com|')
    echo "Modified URL: $modified_url"
# Check if the domain is piped.mha.fi
elif [ "$domain" = "piped.mha.fi" ]; then
    # Replace piped.mha.fi with youtube.com and print the modified URL
    modified_url=$(echo "$url" | sed 's|piped.mha.fi|youtube.com|')
    echo "Modified URL: $modified_url"
else
    # The domain is not twitter.com or youtube.com or nitter.net or piped.mha.fi
    echo "URL not modified"
fi