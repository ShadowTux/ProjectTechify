#nitter only allow 25 usernames per request so we need to split the list of usernames into groups of 25 but we also need to remove the "error-co" username from the list of usernames because it doesn't exist on Twitter and nitter will return an error if we try to get the profile of a non-existent user. 
#I'll probably fix this in a future version of the script when nitter get's updated first but for now, just remove the "error-co" username from the list of usernames manually.
import requests

# read the usernames from the file
with open("twitter-usernames.txt", "r") as f:
    usernames = f.read().splitlines()

# prompt the user for the nitter domain name
nitter_domain = input("Enter the nitter domain name (default is nitter.net): ")
if not nitter_domain:
    nitter_domain = "nitter.net"

# remove "@" from the beginning of the usernames
usernames = [username[1:] if username.startswith("@") else username for username in usernames]

# remove "error-co" from the list of usernames
while "error-co" in usernames:
    usernames.remove("error-co")

# split the usernames into groups of 25
groups = [usernames[i:i+25] for i in range(0, len(usernames), 25)]

# construct the URL for each group of user profiles
urls = []
for group in groups:
    usernames_string = ",".join(group)
    urls.append(f"https://{nitter_domain}/{usernames_string}/with_replies")

# print the final URLs
for url in urls:
    print(url)
