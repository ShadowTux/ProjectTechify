# Read the usernames from the file
with open("twitter-usernames.txt", "r") as f:
    usernames = f.read().splitlines()

# Filter out @error-co usernames
filtered_usernames = [username for username in usernames if username.lower() != "@error-co"]

# Transform usernames into the desired format
formatted_usernames = []
for username in filtered_usernames:
    formatted_username = f"{username}@bird.makeup" if username.startswith("@") else f"@{username}@bird.makeup"
    formatted_usernames.append(formatted_username)

# Prepare the CSV data
csv_data = "Account address,Show boosts,Notify on new posts,Languages\n"
for formatted_username in formatted_usernames:
    csv_data += f"{formatted_username},true,false,\n"

# Write the CSV data to the output file
with open("output.csv", "w") as f:
    f.write(csv_data)

print("CSV data written to output.csv")
