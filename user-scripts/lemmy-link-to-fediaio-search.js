// ==UserScript==
// @name         Lemmy Link Redirector
// @namespace    https://example.com/
// @version      1.0
// @description  Redirect Lemmy domain link to a specific format in userscript style.
// @match        https://lemmy*/c/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get the current Lemmy domain link
    var currentUrl = window.location.href;

    // Extract the slug from the current URL
    var slug = currentUrl.split('/c/')[1];

    // Get the Lemmy instance domain without the subdomain
    var domainParts = window.location.hostname.split('.');
    var hostname = domainParts.slice(-2).join('.');

    // Construct the redirect URL
    var redirectUrl = `https://fedia.io/search?q=${slug}%40${hostname}`;

    // Redirect to the new URL
    window.location.href = redirectUrl;
})();
