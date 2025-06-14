// ==UserScript==
// @name         Enhanced Search !Bang Redirects v2
// @namespace    http://your.namespace.here
// @version      1.5
// @description  Redirects searches with custom bangs and DuckDuckGo bangs loaded in memory
// @match        *://*.google.com/*
// @match        *://*.bing.com/*
// @match        *://startpage.com/*
// @match        *://*.brave.com/*
// @match        *://*.ecosia.org/*
// @match        *://*.duckduckgo.com/*
// @match        *://*.qwant.com/* 
// @match        *://*.mullvad.net/* 
// @match        *://*.mojeek.com/* 
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @license      MIT
// ==/UserScript==

/*
The MIT License (MIT)

Copyright (c) 2025 ShadowTux

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function() {
    'use strict';

    // Configuration
    const BANG_CACHE_KEY = 'cached_bangs';
    const BANG_CACHE_TIMESTAMP_KEY = 'cached_bangs_timestamp';
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const DDG_BANG_URL = 'https://duckduckgo.com/bang.js';

    // Custom bangs that take priority over DuckDuckGo bangs
    const CUSTOM_BANGS = {
        // AI service bangs
        '!chatgpt': {
            url: 'https://chatgpt.com/?q={query}'
        },
        '!chat': {
            url: 'https://chatgpt.com/?q={query}'
        },
        '!summary': {
            url: 'https://search.brave.com/search?q={query}&source=llmSuggest&summary=1'
        },
        '!perp': {
            url: 'https://www.perplexity.ai/search?q={query}'
        },
        '!youai': {
            url: 'https://you.com/search?q={query}&fromSearchBar=true&tbm=youchat&chatMode=default'
        },
        '!phind': {
            url: 'https://www.phind.com/search?q={query}&searchMode=auto&allowMultiSearch=true'
        },
        '!felo': {
            url: 'https://felo.ai/search?q={query}'
        },
        '!ecoai': {
            url: 'https://www.ecosia.org/chat?q={query}'
        },
        '!mistral': {
            url: 'https://chat.mistral.ai/chat?q={query}&mode=ai'
        },
        '!mis': {
            url: 'https://chat.mistral.ai/chat?q={query}&mode=ai'
        },
        
        // Search engine bangs
        '!g': {
            url: 'https://www.google.com/search?q={query}'
        },
        '!s': {
            url: 'https://www.startpage.com/sp/search?query={query}'
        },
        '!sp': {
            url: 'https://www.startpage.com/sp/search?query={query}'
        },
        '!yt': {
            url: 'https://www.youtube.com/results?search_query={query}'
        },
        '!w': {
            url: 'https://en.wikipedia.org/wiki/Special:Search?search={query}'
        },
        '!nixpkgs': {
            url: 'https://search.nixos.org/packages?query={query}'
        },
        '!ddg': {
            url: 'https://duckduckgo.com/?q={query}'
        },
        '!qw': {
            url: 'https://www.qwant.com/?q={query}&t=web'
        },
        '!qwant': {
            url: 'https://www.qwant.com/?q={query}&t=web'
        },
        '!leta': {
            url: 'https://leta.mullvad.net/search?q={query}&engine=brave'
        },
        
        // Mojeek bangs
        '!mj': {
            url: 'https://www.mojeek.com/search?q={query}&theme=dark'
        },
        '!mojeek': {
            url: 'https://www.mojeek.com/search?q={query}&theme=dark'
        },
        '!mjs': {
            url: 'https://www.mojeek.com/search?q={query}&theme=dark&fmt=summary'
        },
        '!sum': {
            url: 'https://www.mojeek.com/search?q={query}&theme=dark&fmt=summary'
        }
    };

    // Global bangs storage
    let allBangs = { ...CUSTOM_BANGS };

    // Function to extract URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Helper function to perform a direct redirect
    function performRedirect(url, query) {
        const finalUrl = url.replace('{query}', encodeURIComponent(query));
        const separator = finalUrl.includes('?') ? '&' : '?';
        const redirectUrl = finalUrl + separator + 'bang_redirect=1&timestamp=' + Date.now();
        
        console.log("Redirecting to:", redirectUrl);
        window.location.replace(redirectUrl);
    }

    // Function to load DuckDuckGo bangs
    function loadDDGBangs() {
        return new Promise((resolve, reject) => {
            // Check if we have cached bangs that are still valid
            const cachedBangs = GM_getValue(BANG_CACHE_KEY, null);
            const cacheTimestamp = GM_getValue(BANG_CACHE_TIMESTAMP_KEY, 0);
            const now = Date.now();

            if (cachedBangs && (now - cacheTimestamp) < CACHE_DURATION) {
                console.log("Loading bangs from cache");
                try {
                    const parsed = JSON.parse(cachedBangs);
                    // Merge with custom bangs, giving priority to custom bangs
                    allBangs = { ...parsed, ...CUSTOM_BANGS };
                    resolve(allBangs);
                    return;
                } catch (e) {
                    console.error("Error parsing cached bangs:", e);
                }
            }

            // Fetch fresh bangs from DuckDuckGo
            console.log("Fetching fresh bangs from DuckDuckGo");
            GM_xmlhttpRequest({
                method: 'GET',
                url: DDG_BANG_URL,
                onload: function(response) {
                    try {
                        // Parse the JavaScript response to extract bang data
                        const jsCode = response.responseText;
                        
                        // Look for the bang data in the JavaScript
                        // DDG bang.js typically contains data in a specific format
                        const bangDataMatch = jsCode.match(/var\s+bangs\s*=\s*(\[.*?\]);/s);
                        
                        if (bangDataMatch) {
                            const bangArray = JSON.parse(bangDataMatch[1]);
                            const ddgBangs = {};
                            
                            // Convert DDG bang format to our format
                            bangArray.forEach(bang => {
                                if (bang.t && bang.u) {
                                    const trigger = '!' + bang.t;
                                    // Don't override custom bangs
                                    if (!CUSTOM_BANGS[trigger]) {
                                        ddgBangs[trigger] = {
                                            url: bang.u.replace('{{{s}}}', '{query}'),
                                            category: bang.c || 'other',
                                            description: bang.s || ''
                                        };
                                    }
                                }
                            });

                            // Cache the DDG bangs
                            GM_setValue(BANG_CACHE_KEY, JSON.stringify(ddgBangs));
                            GM_setValue(BANG_CACHE_TIMESTAMP_KEY, now);
                            
                            // Merge with custom bangs
                            allBangs = { ...ddgBangs, ...CUSTOM_BANGS };
                            
                            console.log(`Loaded ${Object.keys(ddgBangs).length} DuckDuckGo bangs and ${Object.keys(CUSTOM_BANGS).length} custom bangs`);
                            resolve(allBangs);
                        } else {
                            // Fallback: try alternative parsing methods
                            console.warn("Could not parse DDG bang data, using custom bangs only");
                            allBangs = CUSTOM_BANGS;
                            resolve(allBangs);
                        }
                    } catch (e) {
                        console.error("Error parsing DDG bangs:", e);
                        allBangs = CUSTOM_BANGS;
                        resolve(allBangs);
                    }
                },
                onerror: function(error) {
                    console.error("Error fetching DDG bangs:", error);
                    allBangs = CUSTOM_BANGS;
                    resolve(allBangs);
                },
                ontimeout: function() {
                    console.warn("Timeout fetching DDG bangs, using custom bangs only");
                    allBangs = CUSTOM_BANGS;
                    resolve(allBangs);
                },
                timeout: 5000 // 5 second timeout
            });
        });
    }

    // Function to process bangs
    function processBang(query) {
        if (!query) return false;

        // Check for redirection loops
        const wasRedirectedRecently = (Date.now() - (parseInt(localStorage.getItem('lastRedirectTime') || 0)) < 2000);
        if (wasRedirectedRecently) {
            return false;
        }

        // Sort bangs by length (longest first) to handle overlapping bangs correctly
        const bangsList = Object.keys(allBangs).sort((a, b) => b.length - a.length);
        
        // Find the first matching bang
        for (const bang of bangsList) {
            if (query.includes(bang)) {
                const cleanQuery = query.replace(bang, '').trim();
                
                // Record redirect time to prevent loops
                localStorage.setItem('lastRedirectTime', Date.now().toString());
                
                // Perform redirect
                performRedirect(allBangs[bang].url, cleanQuery);
                return true;
            }
        }
        
        return false;
    }

    // Main execution function
    function main() {
        // Extract the search query from various search engines
        const query = getUrlParameter('q') || 
                     getUrlParameter('query') || 
                     getUrlParameter('search_query');

        if (!query) return;

        // Special case for Ecosia shopping search
        const isEcosia = window.location.hostname.includes('ecosia.org');
        const isShoppingSearch = window.location.pathname.includes('/shopping');
        
        if (isEcosia && isShoppingSearch && query) {
            localStorage.setItem('lastRedirectTime', Date.now().toString());
            window.location.replace('https://www.startpage.com/sp/search?query=' + encodeURIComponent(query) + '&bang_redirect=1');
            return;
        }

        // Process the bang
        processBang(query);
    }

    // Initialize and run
    (async function init() {
        try {
            // Load bangs first
            await loadDDGBangs();
            
            // Then process the current page
            main();
            
            // Set up periodic refresh of bang cache (every hour)
            setInterval(() => {
                const cacheTimestamp = GM_getValue(BANG_CACHE_TIMESTAMP_KEY, 0);
                const now = Date.now();
                
                if ((now - cacheTimestamp) > (CACHE_DURATION / 24)) { // Refresh every hour
                    loadDDGBangs();
                }
            }, 60 * 60 * 1000); // Check every hour
            
        } catch (error) {
            console.error("Error initializing bang redirects:", error);
            // Fallback to custom bangs only
            main();
        }
    })();

})();
