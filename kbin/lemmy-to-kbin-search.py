def convert_lemmy_link(link):
    # Remove the "https://" prefix and split the link into parts
    parts = link.replace("https://", "").split("/")

    if len(parts) >= 3:
        # Extract the relevant parts
        domain = parts[0]
        category = parts[1]
        slug = parts[-1]

        # Check if the category is included in the link
        if category == "c":
            # Format the email-like string without the "/c/"
            converted_link = f"{slug}@{domain}"
        else:
            # Format the email-like string as it is
            converted_link = f"{slug}@{category}.{domain}"
        
        return converted_link

    return None

# Prompt the user to enter the Lemmy domain link
lemmy_link = input("Enter the Lemmy domain link: ")

# Convert the link
converted_link = convert_lemmy_link(lemmy_link)

if converted_link:
    print(f"Converted link: {converted_link}")
else:
    print("Invalid Lemmy domain link.")
