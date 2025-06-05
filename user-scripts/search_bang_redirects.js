// ==UserScript==
// @name         Enhanced Search !Bang Redirects
// @namespace    http://your.namespace.here
// @version      1.4
// @description  Redirects searches with custom bangs to various services including Google, YouTube, Wikipedia, and more
// @match        *://*.google.com/*
// @match        *://*.bing.com/*
// @match        *://startpage.com/*
// @match        *://*.brave.com/*
// @match        *://*.ecosia.org/*
// @match        *://*.duckduckgo.com/*
// @match        *://*.qwant.com/* 
// @match        *://*.mullvad.net/* 
// @match        *://*.mojeek.com/* 
// @grant        none
// @run-at       document-start
// @license MIT
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

    // Add a check to prevent redirection loops - specifically not looking for bang_redirect flag
    const wasRedirectedRecently = (new Date().getTime() - (parseInt(localStorage.getItem('lastRedirectTime') || 0)) < 2000);
    if (wasRedirectedRecently) {
        return; // Exit if we've redirected recently
    }
    
    // Function to extract URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Helper function to perform a direct redirect without additional parameters
    function performRedirect(url) {
        localStorage.setItem('lastRedirectTime', new Date().getTime());
        window.location.href = url;
    }
    
    // Helper function to create a Mojeek URL
    function createMojeekUrl(query, isSummary) {
        const baseUrl = 'https://www.mojeek.com/search';
        const cleanQuery = encodeURIComponent(query.trim());
        let params = `?q=${cleanQuery}&theme=dark`;
        
        if (isSummary) {
            params += '&fmt=summary';
        }
        
        return baseUrl + params;
    }

    // Detect search engine hostnames
    const isEcosia = window.location.hostname.includes('ecosia.org');
    const isShoppingSearch = window.location.pathname.includes('/shopping');
    const isMullvad = window.location.hostname.includes('mullvad.net');
    const isMojeek = window.location.hostname.includes('mojeek.com');
    
    // Extract the search query from various search engines
    var query = getUrlParameter('q') || getUrlParameter('query') || getUrlParameter('search_query');
    
    // Special case for Qwant which uses a different parameter
    if (!query && window.location.hostname.includes('qwant.com')) {
        query = getUrlParameter('q');
    }
    
    // Special case for Ecosia shopping search that might have been triggered by !s
    if (isEcosia && isShoppingSearch && query) {
        // Redirect directly to Startpage
        window.location.replace('https://www.startpage.com/sp/search?query=' + encodeURIComponent(query) + '&bang_redirect=1');
        return;
    }
    
    if (query) {
        // Special Mojeek bang handling - process these first before any other bangs
        if (query.startsWith('!mj ')) {
            const mojeekQuery = query.replace('!mj ', '').trim();
            performRedirect(createMojeekUrl(mojeekQuery, false));
            return;
        }
        
        if (query.startsWith('!mojeek ')) {
            const mojeekQuery = query.replace('!mojeek ', '').trim();
            performRedirect(createMojeekUrl(mojeekQuery, false));
            return;
        }
        
        if (query.startsWith('!mjs ')) {
            const mojeekQuery = query.replace('!mjs ', '').trim();
            performRedirect(createMojeekUrl(mojeekQuery, true));
            return;
        }
        
        if (query.startsWith('!sum ')) {
            const mojeekQuery = query.replace('!sum ', '').trim();
            performRedirect(createMojeekUrl(mojeekQuery, true));
            return;
        }
        
        // Define bang patterns with corresponding URLs and additional parameters for all other search engines
        var bangs = {
            // Original AI service bangs
            '!chatgpt': {
                url: 'https://chatgpt.com/?q='
            },
            '!chat': {
                url: 'https://chatgpt.com/?q='
            },
            '!summary': {
                url: 'https://search.brave.com/search?q=',
                params: '&source=llmSuggest&summary=1'
            },
            '!perp': {
                url: 'https://www.perplexity.ai/search?q='
            },
            '!youai': {
                url: 'https://you.com/search?q=',
                params: '&fromSearchBar=true&tbm=youchat&chatMode=default'
            },
            '!phind': {
                url: 'https://www.phind.com/search?q=',
                params: '&searchMode=auto&allowMultiSearch=true'
            },
            '!felo': {
                url: 'https://felo.ai/search?q='
            },
            '!ecoai': {
                url: 'https://www.ecosia.org/chat?q='
            },
            '!mistral': {
                url: 'https://chat.mistral.ai/chat?q=',
                params: '&mode=ai'
            },
            '!mis': {
                url: 'https://chat.mistral.ai/chat?q=',
                params: '&mode=ai'
            },
            
            // Search engine bangs
            '!g': {
                url: 'https://www.google.com/search?q='
            },
            '!s ': { // Note the space after !s - this will only match when there's a space
                url: 'https://www.startpage.com/sp/search?query='
            },
            '!s': { // This will match !s without a space or at the end of a query
                url: 'https://www.startpage.com/sp/search?query='
            },
            '!sp': {
                url: 'https://www.startpage.com/sp/search?query='
            },
            '!yt': {
                url: 'https://www.youtube.com/results?search_query='
            },
            '!w': {
                url: 'https://en.wikipedia.org/wiki/Special:Search?search='
            },
            '!nixpkgs': {
                url: 'https://search.nixos.org/packages?query='
            },
            '!ddg': {
                url: 'https://duckduckgo.com/?q='
            },
            // Qwant bangs 
            '!qw': {
                url: 'https://www.qwant.com/?q=',
                params: '&t=web'
            },
            '!qwant': {
                url: 'https://www.qwant.com/?q=',
                params: '&t=web'
            },
            // Mullvad Leta bang
            '!leta': {
                url: 'https://leta.mullvad.net/search?q=',
                params: '&engine=brave'
            }
            // Mojeek bangs are now handled separately above
        };

        // Special handling for Ecosia - check for !s in the original query before it gets processed by Ecosia
        if (isEcosia && query.includes('!s')) {
            // Check if it's !summary by looking for "!summary" specifically
            if (query.includes('!summary')) {
                var newQuery = query.replace('!summary', '').trim();
                window.location.replace('https://search.brave.com/search?q=' + encodeURIComponent(newQuery) + '&source=llmSuggest&summary=1&bang_redirect=1');
                return;
            }
            
            // Only proceed with !s redirection if it's not part of another bang
            var matchesOtherBang = false;
            for (var otherBang in bangs) {
                // Skip !s and !sp
                if (otherBang === '!s' || otherBang === '!s ' || otherBang === '!sp') {
                    continue;
                }
                
                // Check if query contains another bang
                if (otherBang.startsWith('!s') && query.includes(otherBang)) {
                    matchesOtherBang = true;
                    break;
                }
            }
            
            // If no other bang matched, treat as !s
            if (!matchesOtherBang) {
                var newQuery = query.replace('!s', '').trim();
                window.location.replace('https://www.startpage.com/sp/search?query=' + encodeURIComponent(newQuery) + '&bang_redirect=1');
                return;
            }
        }

        // Regular bang processing - sort bangs by length (longest first) to handle overlapping bangs correctly
        var bangsList = Object.keys(bangs).sort(function(a, b) {
            return b.length - a.length;
        });
        
        var hasBang = false;
        var matchedBang = '';
        
        // First check if any bang exists in the query
        for (var i = 0; i < bangsList.length; i++) {
            var bang = bangsList[i];
            if (query.includes(bang)) {
                hasBang = true;
                matchedBang = bang;
                break;
            }
        }
        
        // If a bang was found, process it
        if (hasBang) {
            console.log("Bang detected:", matchedBang);
            
            // Remove the bang from the query
            var newQuery = query.replace(matchedBang, '').trim();
            
            // Add prefix if defined (before the query)
            if (bangs[matchedBang].prefix) {
                newQuery = bangs[matchedBang].prefix + newQuery;
            }
            
            // Append suffix if defined (after the query)
            if (bangs[matchedBang].suffix) {
                newQuery += bangs[matchedBang].suffix;
            }
            
            // Construct the redirect URL
            var redirectUrl = bangs[matchedBang].url + encodeURIComponent(newQuery);
            
            // Append additional parameters if defined
            if (bangs[matchedBang].params) {
                redirectUrl += bangs[matchedBang].params;
            }
            
            // Add our redirect flag to prevent loops
            redirectUrl += (redirectUrl.includes('?') ? '&' : '?') + 'bang_redirect=1';
            
            console.log("Redirecting to:", redirectUrl);
            
            // Record the time of this redirect to prevent loops
            localStorage.setItem('lastRedirectTime', new Date().getTime());
            
            // Redirect to the constructed URL
            window.location.replace(redirectUrl);
        }
    }
})();
