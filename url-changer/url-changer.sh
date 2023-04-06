#!/bin/bash

# Prompt the user for a URL
read -p "Enter a URL: " url

# Extract the domain from the URL
domain=$(echo "$url" | awk -F/ '{print $3}')

# Check if the domain is twitter.com
if [ "$domain" = "twitter.com" ]; then
    # Replace twitter.com with nitter.net and print the modified URL
    modified_url=$(echo "$url" | sed 's|twitter.com|nitter.net|')
    echo "Modified URL: $modified_url"
# Check if the domain is youtube.com
elif [ "$domain" = "youtube.com" ]; then
    # Replace youtube.com with piped.mha.fi and print the modified URL
    modified_url=$(echo "$url" | sed 's|youtube.com|piped.mha.fi|')
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
