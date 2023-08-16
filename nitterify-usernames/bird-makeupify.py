# Read the usernames from the file
with open("twitter-usernames.txt", "r") as f:
    usernames = f.read().splitlines()

# Transform usernames into the desired format
formatted_usernames = [f"{username}@bird.makeup" if username.startswith("@") else f"@{username}@bird.makeup" for username in usernames]

# Print the formatted usernames
for formatted_username in formatted_usernames:
    print(formatted_username)
