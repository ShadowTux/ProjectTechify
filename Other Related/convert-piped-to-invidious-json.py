import json

# Load the subscriptions JSON file
with open('subscriptions.json') as f:
    subscriptions = json.load(f)

# Extract channel IDs from the subscriptions data
channel_ids = [sub['url'].split('/')[-1] for sub in subscriptions['subscriptions']]

# Create a dictionary with the Invidious-compatible data
invidious_data = {
    'subscriptions': channel_ids,
    'preferences': {
        'annotations': False,
        'annotations_subscribed': False,
        'autoplay': False,
        'automatic_instance_redirect': False,
        'captions': ['', '', ''],
        'comments': ['youtube', ''],
        'continue': False,
        'continue_autoplay': True,
        'dark_mode': '',
        'latest_only': False,
        'listen': False,
        'local': False,
        'watch_history': subscriptions.get('watch_history', []),
        'vr_mode': True,
        'show_nick': True,
        'locale': 'en-US',
        'region': 'US',
        'max_results': 40,
        'notifications_only': False,
        'player_style': 'invidious',
        'quality': 'dash',
        'quality_dash': '2160p',
        'default_home': 'Popular',
        'feed_menu': ['Popular', 'Trending', 'Subscriptions', 'Playlists'],
        'related_videos': True,
        'sort': 'published',
        'speed': 1.0,
        'thin_mode': False,
        'unseen_only': False,
        'video_loop': False,
        'extend_desc': False,
        'volume': 100,
        'save_player_pos': False
    },
    'playlists': []
}

# Save the Invidious-compatible data to a JSON file
with open('invidious_subscriptions.json', 'w') as f:
    json.dump(invidious_data, f, indent=4)
