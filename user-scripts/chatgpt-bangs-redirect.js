// ==UserScript==
// @name         DuckDuckGo !chatgpt and !chat Bang Redirect with Web Search
// @namespace    http://your.namespace.here
// @version      1.2
// @description  Redirects DuckDuckGo searches with !chatgpt or !chat bangs to ChatGPT, appending 'use web search' to each query
// @match        *://duckduckgo.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/*
The MIT License (MIT)

Copyright (c) [YEAR] [AUTHOR]

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
        // Check if the query contains '!chatgpt' or '!chat'
        if (query.includes('!chatgpt') || query.includes('!chat')) {
            // Remove the bang from the query
            var newQuery = query.replace('!chatgpt', '').replace('!chat', '').trim();
            // Append 'use web search' to the query
            newQuery += ' use web search';
            // Construct the ChatGPT URL
            var chatgptUrl = 'https://chatgpt.com/?q=' + encodeURIComponent(newQuery) + '&hints=search';
            // Redirect to ChatGPT
            window.location.replace(chatgptUrl);
        }
    }
})();
