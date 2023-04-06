import os
import re

# Replace with the path to your `nitter-following.js` file
file_path = 'twitter-following.js'

# Regex pattern to match the `accountId` values
pattern = r'"accountId"\s*:\s*"(\d+)"'

# Extract the directory and filename from the file path
dir_path, file_name = os.path.split(file_path)

# Create a new file path for the output file
output_path = os.path.join(dir_path, 'nitter-id.txt')

with open(file_path, 'r', encoding='utf-8') as input_file, \
     open(output_path, 'w', encoding='utf-8') as output_file:
    # Read the entire input file contents
    file_contents = input_file.read()

    # Use regex to find all `accountId` values and store them in a list
    account_ids = re.findall(pattern, file_contents)

    # Write the list of account IDs to the output file, one ID per line
    output_file.write('\n'.join(account_ids))
