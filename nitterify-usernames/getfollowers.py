# Description: Get the followers of a Birdsite user
# helping script that I found here tweeterid.com & https://github.com/meatyite/python-tweeterid but it makes many requests to the tweeterid.com website and it's slow so I decided to make a script that uses the tweeterid.com API instead of the website. Might create some that does not need the site. Recommendations are welcome.
import requests
import json

# Define functions to convert between Birdsite handles and IDs
def handle_to_id(handle: str) -> int:
    Id = requests.post(
        'https://tweeterid.com/ajax.php',
        data={
            'input': handle
        }
    ).content.decode()
    return int(Id)

def id_to_handle(id_: int) -> str:
    handle = requests.post(
        'https://tweeterid.com/ajax.php',
        data={
            'input': str(id_)
        }
    ).content.decode()
    return handle

# Read the list of Birdsite IDs from the file
with open('nitter-id.txt', 'r') as f:
    ids = f.read().splitlines()

# Convert each ID to a username and print the result
with open('nitter-usernames.txt', 'w') as f:
    for id in ids:
        handle = id_to_handle(id)
        print(f'nitter ID {id} corresponds to handle {handle}')
        f.write(handle + '\n')

