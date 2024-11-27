// ==UserScript==
// @name         DuckDuckGo !chatgpt and !chat Bang Redirect with Web Search
// @namespace    http://your.namespace.here
// @version      1.2
// @description  Redirects DuckDuckGo searches with !chatgpt or !chat bangs to ChatGPT, appending 'use web search' to each query
// @match        *://duckduckgo.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

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
