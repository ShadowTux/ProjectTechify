// ==UserScript==
// @name         Enhanced Search !Bang Redirects
// @namespace    http://your.namespace.here
// @version      1.2
// @description  Redirects searches with custom bangs to various services including Google, YouTube, Wikipedia, and more
// @match        *://*.google.com/*
// @match        *://*.bing.com/*
// @match        *://startpage.com/*
// @match        *://*.brave.com/*
// @match        *://*.ecosia.org/*
// @match        *://*.duckduckgo.com/*
// @match        *://*.qwant.com/*
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

    // Add a check to prevent redirection loops
    const redirectFlag = 'bang_redirect';
    if (window.location.href.includes(redirectFlag)) {
        return; // Exit if we detect our redirect flag
    }

    // Function to extract URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Detect if we're on Ecosia and in shopping mode
    const isEcosia = window.location.hostname.includes('ecosia.org');
    const isShoppingSearch = window.location.pathname.includes('/shopping');

    // Extract the search query from various search engines
    var query = getUrlParameter('q') || getUrlParameter('query') || getUrlParameter('search_query');

    // Special case for Qwant which uses a different parameter
    if (!query && window.location.hostname.includes('qwant.com')) {
        query = getUrlParameter('q');  // Changed from 't' to 'q' based on user's example
    }

    // Special case for Ecosia shopping search that might have been triggered by !s
    if (isEcosia && isShoppingSearch && query) {
        // Redirect directly to Startpage
        window.location.replace('https://www.startpage.com/sp/search?query=' + encodeURIComponent(query) + '&' + redirectFlag + '=1');
        return;
    }

    if (query) {
        // Define bang patterns with corresponding URLs and additional parameters
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

            // New bangs requested by user
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
            // Updated Qwant bangs to use the correct URL format
            '!qw': {
                url: 'https://www.qwant.com/?q=',
                params: '&t=web'
            },
            '!qwant': {
                url: 'https://www.qwant.com/?q=',
                params: '&t=web'
            }
        };

        // Special handling for Ecosia - check for !s in the original query before it gets processed by Ecosia
        if (isEcosia && query.includes('!s')) {
            // Check if it's !summary by looking for "!summary" specifically
            if (query.includes('!summary')) {
                var newQuery = query.replace('!summary', '').trim();
                window.location.replace('https://search.brave.com/search?q=' + encodeURIComponent(newQuery) + '&source=llmSuggest&summary=1&' + redirectFlag + '=1');
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
                window.location.replace('https://www.startpage.com/sp/search?query=' + encodeURIComponent(newQuery) + '&' + redirectFlag + '=1');
                return;
            }
        }

        // Regular bang processing - sort bangs by length (longest first) to handle overlapping bangs correctly
        var bangsList = Object.keys(bangs).sort(function(a, b) {
            return b.length - a.length;
        });

        for (var i = 0; i < bangsList.length; i++) {
            var bang = bangsList[i];
            if (query.includes(bang)) {
                // Remove the bang from the query
                var newQuery = query.replace(bang, '').trim();

                // Add prefix if defined (before the query)
                if (bangs[bang].prefix) {
                    newQuery = bangs[bang].prefix + newQuery;
                }

                // Append suffix if defined (after the query)
                if (bangs[bang].suffix) {
                    newQuery += bangs[bang].suffix;
                }

                // Construct the redirect URL
                var redirectUrl = bangs[bang].url + encodeURIComponent(newQuery);

                // Append additional parameters if defined
                if (bangs[bang].params) {
                    redirectUrl += bangs[bang].params;
                }

                // Add our redirect flag to prevent loops
                redirectUrl += (redirectUrl.includes('?') ? '&' : '?') + redirectFlag + '=1';

                // Redirect to the constructed URL
                window.location.replace(redirectUrl);
                break;
            }
        }
    }
})();
