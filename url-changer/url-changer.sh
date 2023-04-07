#!/bin/bash

# Prompt the user for a URL
read -p "Enter a URL: " url

# Extract the domain from the URL and remove "www." if present (for youtube.com)
domain=$(echo "$url" | awk -F/ '{print $3}' | sed 's/^www\.//')

# Check if the domain is twitter.com
if [ "$domain" = "twitter.com" ]; then
    # Replace twitter.com with nitter.net and print the modified URL
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
