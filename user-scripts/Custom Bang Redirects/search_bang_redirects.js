// ==UserScript==
// @name         Enhanced Search !Bang Redirects v2
// @namespace    http://your.namespace.here
// @version      2.2
// @description  Redirects searches with custom bangs and DuckDuckGo bangs loaded from GitHub
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
    const BANG_CACHE_KEY = 'cached_bangs_v2';
    const BANG_CACHE_TIMESTAMP_KEY = 'cached_bangs_timestamp_v2';
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const GITHUB_BANG_URL = 'https://raw.githubusercontent.com/ShadowTux/ProjectTechify/refs/heads/main/src/bang.ts';

    // Custom bangs that take priority over DuckDuckGo bangs
    const CUSTOM_BANGS = {
        // AI service bangs
        '!chatgpt': {
            url: 'https://chatgpt.com/?q={query}',
            description: 'ChatGPT AI Assistant',
            category: 'AI'
        },
        '!chat': {
            url: 'https://chatgpt.com/?q={query}',
            description: 'ChatGPT AI Assistant',
            category: 'AI'
        },
        '!claude': {
            url: 'https://claude.ai',
            description: 'Claude AI Assistant',
            category: 'AI'
        },
        '!summary': {
            url: 'https://search.brave.com/search?q={query}&source=llmSuggest&summary=1',
            description: 'Brave Search with AI Summary',
            category: 'AI'
        },
        '!perp': {
            url: 'https://www.perplexity.ai/search?q={query}',
            description: 'Perplexity AI Search',
            category: 'AI'
        },
        '!youai': {
            url: 'https://you.com/search?q={query}&fromSearchBar=true&tbm=youchat&chatMode=default',
            description: 'You.com AI Chat',
            category: 'AI'
        },
        '!phind': {
            url: 'https://www.phind.com/search?q={query}&searchMode=auto&allowMultiSearch=true',
            description: 'Phind AI for Developers',
            category: 'AI'
        },
        '!felo': {
            url: 'https://felo.ai/search?q={query}',
            description: 'Felo AI Search',
            category: 'AI'
        },
        '!ecoai': {
            url: 'https://www.ecosia.org/chat?q={query}',
            description: 'Ecosia AI Chat',
            category: 'AI'
        },
        '!mistral': {
            url: 'https://chat.mistral.ai/chat?q={query}&mode=ai',
            description: 'Mistral AI Chat',
            category: 'AI'
        },
        '!mis': {
            url: 'https://chat.mistral.ai/chat?q={query}&mode=ai',
            description: 'Mistral AI Chat',
            category: 'AI'
        },

        // Search engine bangs
        '!g': {
            url: 'https://www.google.com/search?q={query}',
            description: 'Google Search',
            category: 'Search'
        },
        '!s': {
            url: 'https://www.startpage.com/sp/search?query={query}',
            description: 'Startpage Search',
            category: 'Search'
        },
        '!sp': {
            url: 'https://www.startpage.com/sp/search?query={query}',
            description: 'Startpage Search',
            category: 'Search'
        },
        '!yt': {
            url: 'https://www.youtube.com/results?search_query={query}',
            description: 'YouTube Search',
            category: 'Multimedia'
        },
        '!w': {
            url: 'https://en.wikipedia.org/wiki/Special:Search?search={query}',
            description: 'Wikipedia Search',
            category: 'Research'
        },
        '!nixpkgs': {
            url: 'https://search.nixos.org/packages?query={query}',
            description: 'NixOS Packages',
            category: 'Tech'
        },
        '!ddg': {
            url: 'https://duckduckgo.com/?q={query}',
            description: 'DuckDuckGo Search',
            category: 'Search'
        },
        '!qw': {
            url: 'https://www.qwant.com/?q={query}&t=web',
            description: 'Qwant Search',
            category: 'Search'
        },
        '!qwant': {
            url: 'https://www.qwant.com/?q={query}&t=web',
            description: 'Qwant Search',
            category: 'Search'
        },
        '!leta': {
            url: 'https://leta.mullvad.net/search?q={query}&engine=brave',
            description: 'Mullvad Leta Search',
            category: 'Search'
        },

        // Mojeek bangs
        '!mj': {
            url: 'https://www.mojeek.com/search?q={query}&theme=dark',
            description: 'Mojeek Search',
            category: 'Search'
        },
        '!mojeek': {
            url: 'https://www.mojeek.com/search?q={query}&theme=dark',
            description: 'Mojeek Search',
            category: 'Search'
        },
        '!mjs': {
            url: 'https://www.mojeek.com/search?q={query}&theme=dark&fmt=summary',
            description: 'Mojeek Search with Summary',
            category: 'Search'
        },
        '!sum': {
            url: 'https://www.mojeek.com/search?q={query}&theme=dark&fmt=summary',
            description: 'Mojeek Search with Summary',
            category: 'Search'
        }
    };

    // Global bangs storage
    let allBangs = { ...CUSTOM_BANGS };
    let isLoading = false;
    let loadPromise = null;

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

        // For URLs that don't contain {query} placeholder, don't add extra parameters
        let redirectUrl;
        if (url.includes('{query}')) {
            const separator = finalUrl.includes('?') ? '&' : '?';
            redirectUrl = finalUrl + separator + 'bang_redirect=1&timestamp=' + Date.now();
        } else {
            // For simple redirects like Claude.ai, just use the URL as-is
            redirectUrl = finalUrl;
        }

        console.log("Redirecting to:", redirectUrl);
        localStorage.setItem('lastRedirectTime', Date.now().toString());
        window.location.replace(redirectUrl);
    }

    // Function to parse GitHub TypeScript bang data
    function parseGitHubBangs(tsContent) {
        const ddgBangs = {};
        let count = 0;

        try {
            // Extract the array content from the TypeScript file
            const arrayMatch = tsContent.match(/export const bangs = \[([\s\S]*?)\];/);

            if (!arrayMatch) {
                console.error("Could not find bangs array in TypeScript file");
                return ddgBangs;
            }

            const arrayContent = arrayMatch[1];

            // Split by object boundaries and parse each object
            const objectMatches = arrayContent.match(/\{[^}]*\}/g);

            if (!objectMatches) {
                console.error("Could not parse bang objects");
                return ddgBangs;
            }

            objectMatches.forEach(objStr => {
                try {
                    // Convert TypeScript object to JSON by adding quotes around keys
                    const jsonStr = objStr
                        .replace(/(\w+):/g, '"$1":')  // Quote unquoted keys
                        .replace(/'/g, '"')           // Replace single quotes with double quotes
                        .replace(/,\s*}/g, '}');      // Remove trailing commas

                    const bang = JSON.parse(jsonStr);

                    if (bang.t && bang.u) {
                        const trigger = '!' + bang.t;
                        // Don't override custom bangs
                        if (!CUSTOM_BANGS[trigger]) {
                            ddgBangs[trigger] = {
                                url: bang.u.replace(/{{{s}}}/g, '{query}'),
                                description: bang.s || '',
                                domain: bang.d || '',
                                category: 'DuckDuckGo'
                            };
                            count++;
                        }
                    }
                } catch (e) {
                    // Skip objects that can't be parsed
                    console.debug("Failed to parse bang object:", objStr, e);
                }
            });

        } catch (e) {
            console.error("Error parsing GitHub bang data:", e);
        }

        console.log(`Parsed ${count} bangs from GitHub`);
        return ddgBangs;
    }

    // Function to load bangs from GitHub
    function loadGitHubBangs() {
        if (loadPromise) {
            return loadPromise;
        }

        loadPromise = new Promise((resolve, reject) => {
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
                    console.log(`Loaded ${Object.keys(parsed).length} cached GitHub bangs and ${Object.keys(CUSTOM_BANGS).length} custom bangs`);
                    resolve(allBangs);
                    return;
                } catch (e) {
                    console.error("Error parsing cached bangs:", e);
                }
            }

            // Fetch fresh bangs from GitHub
            console.log("Fetching fresh bangs from GitHub...");
            isLoading = true;

            GM_xmlhttpRequest({
                method: 'GET',
                url: GITHUB_BANG_URL,
                headers: {
                    'User-Agent': 'Enhanced-Search-Bang-Redirects/2.1',
                    'Accept': 'text/plain, text/typescript, */*'
                },
                onload: function(response) {
                    isLoading = false;
                    try {
                        if (response.status === 200) {
                            const tsContent = response.responseText;
                            console.log("Successfully fetched GitHub bang data");

                            const githubBangs = parseGitHubBangs(tsContent);

                            if (Object.keys(githubBangs).length > 0) {
                                // Cache the GitHub bangs
                                GM_setValue(BANG_CACHE_KEY, JSON.stringify(githubBangs));
                                GM_setValue(BANG_CACHE_TIMESTAMP_KEY, now);

                                // Merge with custom bangs
                                allBangs = { ...githubBangs, ...CUSTOM_BANGS };

                                console.log(`Successfully loaded ${Object.keys(githubBangs).length} GitHub bangs and ${Object.keys(CUSTOM_BANGS).length} custom bangs`);
                                resolve(allBangs);
                            } else {
                                console.warn("No bangs parsed from GitHub data, using custom bangs only");
                                allBangs = CUSTOM_BANGS;
                                resolve(allBangs);
                            }
                        } else {
                            console.error("Failed to fetch GitHub bangs, status:", response.status);
                            allBangs = CUSTOM_BANGS;
                            resolve(allBangs);
                        }
                    } catch (e) {
                        console.error("Error processing GitHub bangs:", e);
                        allBangs = CUSTOM_BANGS;
                        resolve(allBangs);
                    }
                },
                onerror: function(error) {
                    isLoading = false;
                    console.error("Error fetching GitHub bangs:", error);
                    allBangs = CUSTOM_BANGS;
                    resolve(allBangs);
                },
                ontimeout: function() {
                    isLoading = false;
                    console.warn("Timeout fetching GitHub bangs, using custom bangs only");
                    allBangs = CUSTOM_BANGS;
                    resolve(allBangs);
                },
                timeout: 15000 // 15 second timeout
            });
        });

        return loadPromise;
    }

    // Function to process bangs
    function processBang(query) {
        if (!query) return false;

        console.log(`Processing query for bangs: "${query}"`);

        // Check for redirection loops
        const wasRedirectedRecently = (Date.now() - (parseInt(localStorage.getItem('lastRedirectTime') || 0)) < 2000);
        if (wasRedirectedRecently) {
            console.log("Skipping redirect to prevent loop");
            return false;
        }

        // Check if query contains bang_redirect parameter (prevents processing already redirected URLs)
        if (query.includes('bang_redirect=1')) {
            console.log("Skipping bang processing - already redirected");
            return false;
        }

        // Sort bangs by length (longest first) to handle overlapping bangs correctly
        const bangsList = Object.keys(allBangs).sort((a, b) => b.length - a.length);

        // Find the first matching bang
        for (const bang of bangsList) {
            if (query.includes(bang)) {
                const cleanQuery = query.replace(bang, '').trim();

                console.log(`Found bang: ${bang} -> ${allBangs[bang].description}, query: "${cleanQuery}"`);
                console.log(`Bang URL: ${allBangs[bang].url}`);

                // Perform redirect
                performRedirect(allBangs[bang].url, cleanQuery);
                return true;
            }
        }

        console.log("No matching bang found");
        return false;
    }

    // Main execution function
    function main() {
        // Extract the search query from various search engines
        const query = getUrlParameter('q') ||
                     getUrlParameter('query') ||
                     getUrlParameter('search_query');

        if (!query) return;

        console.log(`Processing query: "${query}"`);

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

    // Debug function to show loaded bangs
    function showLoadedBangs() {
        const customCount = Object.keys(CUSTOM_BANGS).length;
        const totalCount = Object.keys(allBangs).length;
        const githubCount = totalCount - customCount;

        console.log(`🔥 Enhanced Search Bang Redirects v2.1 Status:`);
        console.log(`   Custom bangs: ${customCount}`);
        console.log(`   GitHub bangs: ${githubCount}`);
        console.log(`   Total bangs: ${totalCount}`);
        console.log(`   Is loading: ${isLoading}`);

        // Show some example bangs
        const exampleBangs = Object.keys(allBangs).slice(0, 10);
        console.log(`   Example bangs: ${exampleBangs.join(', ')}`);
    }

    // Make debug function available globally
    window.showBangs = showLoadedBangs;

    // Initialize and run
    (async function init() {
        try {
            console.log("🚀 Initializing Enhanced Search Bang Redirects v2.1...");

            // Start loading bangs in background
            const bangLoadPromise = loadGitHubBangs();

            // Process current page immediately with whatever bangs we have
            main();

            // Wait for bang loading to complete for future use
            await bangLoadPromise;

            showLoadedBangs();
            console.log("✅ Bang system ready! Type 'showBangs()' in console for status.");

        } catch (error) {
            console.error("❌ Error initializing bang redirects:", error);
            // Ensure we always have at least custom bangs
            allBangs = CUSTOM_BANGS;
            main();
        }
    })();

})();
