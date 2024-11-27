// ==UserScript==
// @name         DuckDuckGo Custom Bang Redirects
// @namespace    http://your.namespace.here
// @version      1.4
// @description  Redirects DuckDuckGo searches with custom bangs to specified services
// @match        *://duckduckgo.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/*
The MIT License (MIT)

Copyright (c) 2024 ShadowTux

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

    // Function to extract URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Extract the search query
    var query = getUrlParameter('q');
    if (query) {
        // Define bang patterns and their corresponding URLs
        var bangs = {
            '!chatgpt': 'https://chatgpt.com/?q=',
            '!chat': 'https://chatgpt.com/?q=',
            '!summary': 'https://search.brave.com/search?q=',
            '!perp': 'https://www.perplexity.ai/search?q=',
            '!youai': 'https://you.com/search?q='
        };

        // Iterate over the defined bangs
        for (var bang in bangs) {
            if (query.includes(bang)) {
                // Remove the bang from the query
                var newQuery = query.replace(bang, '').trim();
                // Append 'use web search' to the query for ChatGPT bangs
                if (bang === '!chatgpt' || bang === '!chat') {
                    newQuery += ' use web search';
                }
                // Construct the redirect URL
                var redirectUrl = bangs[bang] + encodeURIComponent(newQuery);
                // Add specific parameters for Brave Search summary
                if (bang === '!summary') {
                    redirectUrl += '&source=llmSuggest&summary=1';
                }
                // Add specific parameters for You.com AI chat
                if (bang === '!youai') {
                    redirectUrl += '&fromSearchBar=true&tbm=youchat&chatMode=custom';
                }
                // Redirect to the constructed URL
                window.location.replace(redirectUrl);
                break;
            }
        }
    }
})();
