# **Enhanced Search !Bang Redirects v3.1**

The Enhanced Search !Bang Redirects userscript improves your search experience by introducing custom bang commands and live DuckDuckGo bang lookups. It works across multiple search engines, including Google, Bing, Startpage, Brave, Ecosia, DuckDuckGo, Qwant, Mullvad Leta, and Mojeek.

## Features

### AI Service Bangs
- `!chatgpt` or `!chat`: Redirects to ChatGPT with the query
- `!claude`: Redirects to Claude.ai (main site)
- `!summary`: Redirects to Brave Search with AI summary
- `!perp`: Redirects to Perplexity.ai
- `!youai`: Redirects to You.com's AI chat
- `!phind`: Redirects to Phind.com (developer-focused)
- `!felo`: Redirects to Felo.ai
- `!ecoai`: Redirects to Ecosia's AI chat
- `!mistral` or `!mis`: Redirects to Mistral AI Chat

### Search Engine & Content Bangs
- `!g`: Google
- `!s` or `!sp`: Startpage
- `!yt`: YouTube
- `!w`: Wikipedia
- `!nixpkgs`: NixOS packages
- `!ddg`: DuckDuckGo
- `!qw` or `!qwant`: Qwant
- `!leta`: Mullvad Leta (Brave engine)
- `!mj` or `!mojeek`: Mojeek
- `!mjs` or `!sum`: Mojeek with summary

## What’s new in v3.1

### On‑Demand DuckDuckGo Bangs (bang.js)
- Uses the official `https://duckduckgo.com/bang.js` endpoint at runtime
- No need to ship or cache a full local bang list file
- Smart caching of individual bangs for 7 days

### Reliable Redirects
- Converts DuckDuckGo URLs with `{{{s}}}` into `{query}` at runtime
- Requires a space after the bang (e.g., `!a2 test`, not `!a2test`)
- Adds `bang_redirect=1` to avoid redirect loops (no timestamp/localStorage hacks)

### Cross‑Browser Support
- Works in Tampermonkey/Violentmonkey (Chrome/Firefox)
- Uses `GM_xmlhttpRequest` to avoid CORS issues when fetching `bang.js`

### Ecosia Handling
- Processes bangs immediately on Ecosia to beat native navigation
- Redirects Ecosia shopping results to Startpage for better results

## Supported Search Engines
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
   - Tampermonkey / Violentmonkey / Greasemonkey
2. Add the userscript:
   - Create a new userscript and paste the contents of `search_bang_redirects.js`
   - Save and enable

## Usage

Type a bang followed by a space and your query on any supported engine:

```
!a2 alternative to photoshop
!chatgpt how to install Linux
!yt learn JavaScript tutorial
!w artificial intelligence
!g weather forecast
```

The script detects the bang and redirects to the appropriate site.

## Debugging & Tools
- `showBangs()` – Prints current status and example custom bangs
- `testDuckDuckGoBang('!a2')` – Test a single DuckDuckGo bang via bang.js
- `searchDuckDuckGoBangs('alternative')` – Search bang.js listing for matches
- `clearDuckDuckGoCache()` – Clears local cached bang lookups

## Technical Notes

### Core Behavior
- Longest‑first bang matching to avoid overlaps
- Space‑after‑bang requirement for clarity and to prevent false positives
- Loop prevention via `bang_redirect=1`

### Performance
- On‑demand requests to `bang.js` with 7‑day per‑bang caching
- Minimal memory footprint (no full local bang list)

### Error Handling
- Graceful fallback to custom bangs if remote fetch fails
- Ecosia‑specific early processing to ensure reliable redirects

## License

MIT
