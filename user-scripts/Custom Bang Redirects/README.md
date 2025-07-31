# **Enhanced Search !Bang Redirects v2.2**

The Enhanced Search !Bang Redirects userscript improves your search experience by introducing custom bang commands that redirect searches to various AI services, search engines, and content platforms across multiple search engines, including Google, Bing, Startpage, Brave, Ecosia, DuckDuckGo, Qwant, Mullvad Leta, and Mojeek.

## Features

### AI Service Bangs:
- `!chatgpt` or `!chat`: Redirects to ChatGPT with the query
- `!claude`: Redirects to Claude.ai (main site only, no search functionality)
- `!summary`: Redirects to Brave Search with AI summary feature enabled
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
- `!mj` or `!mojeek`: Redirects to Mojeek search with dark theme
- `!mjs` or `!sum`: Redirects to Mojeek search with AI summary feature

## Enhanced Features in v2.2

### Dynamic Bang Loading:
- **GitHub Integration**: Automatically loads DuckDuckGo bang database from GitHub repository
- **Custom Bang Priority**: Custom bangs take precedence over DuckDuckGo bangs to ensure consistent behavior
- **Smart Caching**: 24-hour cache system for improved performance and reduced network requests
- **Fallback System**: Uses custom bangs if GitHub loading fails

### Advanced Redirect Logic:
- **Intelligent URL Handling**: Properly handles URLs with and without query parameters
- **Loop Prevention**: Enhanced protection against redirect loops with timestamp tracking
- **Debug Console**: Type `showBangs()` in browser console to see loaded bang statistics

### Improved Search Engine Support:
- **Universal Compatibility**: Works across all major search engines
- **Special Handling**: Custom logic for Ecosia shopping searches (redirects to Startpage)
- **Parameter Detection**: Supports multiple search parameter formats (`q`, `query`, `search_query`)

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

1. **Install a Userscript Manager:**
   * [Tampermonkey for Chrome, Firefox, Safari, and Edge](https://tampermonkey.net/)
   * [Greasemonkey for Firefox](https://www.greasespot.net/)
   * [Violentmonkey for Chrome, Firefox, and Edge](https://violentmonkey.github.io/)

2. **Recommended: Install Violentmonkey:**
   * Chrome: [Violentmonkey Chrome Extension](https://chrome.google.com/webstore/detail/violentmonkey/bpeaeghimhilgfimepgamcjbbodcjuhi)
   * Firefox: [Violentmonkey Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)

3. **Add the Userscript:**
   * Create a new userscript in your manager
   * Copy and paste the script code into the editor
   * Save and enable the script

## Usage

In the search bar of any supported search engine, use the bang commands followed by your search terms:

```
!chatgpt how to install Linux
!claude (redirects to main Claude.ai site)
!yt learn JavaScript tutorial
!w artificial intelligence
!g weather forecast
!qwant privacy tools
!leta secure vpn
!sum AI summary search mojeek
```

The script automatically redirects to the appropriate service based on the bang used.

## Technical Notes

### Core Functionality:
* **Bang Processing**: Bangs are processed in order of length (longest first) to avoid conflicts
* **Loop Prevention**: Advanced redirection loop detection with timestamp-based cooldowns
* **Parameter Handling**: Automatic detection and processing of search parameters across different engines
* **Error Handling**: Graceful fallback to custom bangs if external sources fail

### Performance Optimizations:
* **Caching System**: 24-hour cache for GitHub-loaded bangs reduces network requests
* **Asynchronous Loading**: Non-blocking bang database loading for instant page processing
* **Memory Management**: Efficient storage and retrieval of bang configurations

### Special Cases:
* **Ecosia Shopping**: Automatically redirects shopping searches to Startpage for better results
* **Claude.ai**: Simple redirect to main site (no search parameters, as Claude doesn't support URL-based search)
* **Mojeek Themes**: Automatically applies dark theme for better user experience
* **Query Cleanup**: Intelligent removal of bang triggers from search queries

### Debug Features:
* **Console Logging**: Detailed logging for troubleshooting and development
* **Status Command**: Use `showBangs()` in browser console to see:
  - Number of custom bangs loaded
  - Number of GitHub bangs loaded
  - Total bang count
  - Loading status
  - Example bang list

### GitHub Integration:
* **Repository**: Loads bang database from [ShadowTux/ProjectTechify](https://github.com/ShadowTux/ProjectTechify)
* **Format**: TypeScript array parsing with JSON conversion
* **Timeout**: 15-second timeout for GitHub requests
* **Retry Logic**: Automatic fallback to cached or custom bangs on failure

## License

This project is licensed under the MIT License. Feel free to modify and share!

**Note**: This script enhances your search experience by providing custom bangs similar to DuckDuckGo's bang system, but it works across multiple search engines with additional AI service integration and dynamic bang loading capabilities.
