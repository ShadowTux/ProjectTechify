// ==UserScript==
// @name         Piped.video to piped.mha.fi
// @namespace    http://tampermonkey.net/
// @description  Redirect piped.video to piped.mha.fi
// @match        *://*.piped.video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    if (window.location.href.match(/^https?:\/\/piped\.video\/watch\?v=[A-Za-z0-9]*/)) {
        var videoId = window.location.href.match(/v=([A-Za-z0-9_-]*)/)[1];
        window.location.replace ("https://piped.mha.fi/watch?v=" + videoId);
    }
})();
