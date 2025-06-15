## **Enhanced Search !Bang Redirects**

The Enhanced Search !Bang Redirects userscript improves your search experience by introducing custom bang commands that redirect searches to various AI services, search engines, and content platforms across multiple search engines, including Google, Bing, Startpage, Brave, Ecosia, DuckDuckGo, Qwant, and Mullvad Leta.

## Features

### AI Service Bangs:
- `!chatgpt` or `!chat`: Redirects to ChatGPT with the query
- `!summary`: Redirects to Brave Search with summary feature enabled
- `!perp`: Redirects to Perplexity.ai with the given query
- `!youai`: Redirects to You.com's AI chat with the specified query
- `!phind`: Redirects to Phind.com, optimized for technical searches
- `!felo`: Redirects to Felo.ai with the given query
- `!ecoai`: Redirects to Ecosia's AI chat with the given query
- `!mistral` or `!mis`: Redirects to Mistral AI's chat with the given query

### Search Engine & Content Bangs:
- `!g`: Redirects to Google Search
- `!s` or `!sp`: Redirects to Startpage
- `!yt`: Redirects to YouTube search results
- `!w`: Redirects to Wikipedia search
- `!nixpkgs`: Redirects to NixOS packages search
- `!ddg`: Redirects to DuckDuckGo search
- `!qw` or `!qwant`: Redirects to Qwant web search
- `!leta`: Redirects to Mullvad Leta search (with Brave as the search engine)
- `!mj` or `!mojeek`: Redirects to Mojeek search

## Missing Functionality Notes:

* `!mojs` or `!sum`: Redirects to Mojeek search with summary (not implemented yet, but available in Mojeek)
* Ecosia shopping search redirects to Startpage (as Ecosia doesn't support direct bang redirects)

## Supported Search Engines

The script works on the following search engine domains:
- Google (`google.com`)
- Bing (`bing.com`)
- Startpage (`startpage.com`)
- Brave Search (`brave.com`)
- Ecosia (`ecosia.org`)
- DuckDuckGo (`duckduckgo.com`)
- Qwant (`qwant.com`)
- Mullvad Leta (`mullvad.net`)
- Mojeek (`mojeek.com`)

## Installation

1. Install a Userscript Manager:
	* [Tampermonkey for Chrome, Firefox, Safari, and Edge](https://tampermonkey.net/)
	* [Greasemonkey for Firefox](https://www.greasespot.net/)
	* [Violentmonkey for Chrome, Firefox, and Edge](https://violentmonkey.github.io/)
2. Install Violentmonkey:
	* Chrome: [Violentmonkey Chrome Extension](https://chrome.google.com/webstore/detail/violentmonkey/bpeaeghimhilgfimepgamcjbbodcjuhi)
	* Firefox: [Violentmonkey Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
3. Add the Userscript:
	* Create a new userscript in your manager
	* Copy and paste the script code into the editor
	* Save and enable the script

## Usage

In the search bar of any supported search engine, use the bang commands followed by your search terms:

```
!chatgpt how to install Linux
!yt learn JavaScript tutorial
!w artificial intelligence
!g weather forecast
!qwant privacy tools
!leta secure vpn
```

The script automatically redirects to the appropriate service based on the bang used.

## Technical Notes

* The script prevents redirection loops by adding a flag to URLs
* Bangs are processed in order of length (longest first) to avoid conflicts
* Special handling is implemented for Ecosia to properly differentiate between similar bangs (like `!s` vs `!summary`)
* Qwant searches use the `q` parameter with `t=web` for proper redirects
* Mullvad Leta searches use the `q` parameter with `engine=brave` to specify the search engine
* **Cache Note:** The script keeps all the bangs in cache for 24 hours to improve performance and reduce the number of requests to the GitHub repository. This means that you will see the same bangs even if the repository is updated within that time frame.

## License

This project is licensed under the MIT License. Feel free to modify and share!

Note: This script enhances your search experience by providing custom bangs similar to DuckDuckGo's bang system, but it works across multiple search engines.
