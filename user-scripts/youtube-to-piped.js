// ==UserScript==
// @name         Youtube to Piped
// @namespace    https://github.com/ShadowTux/ProjectTechify
// @version      1.1
// @description  Redirect YouTube to piped.mha.fi
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @author       shadowtux
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/ShadowTux/ProjectTechify/main/user-scripts/youtube-to-piped.js
// @downloadURL  https://raw.githubusercontent.com/ShadowTux/ProjectTechify/main/user-scripts/youtube-to-piped.js
// ==/UserScript==

(function() {
    'use strict';

    if (window.location.href.match(/^https?:\/\/www.youtube\.com\/watch\?v=[A-Za-z0-9]*/)) {
	window.location.replace ("https://piped.mha.fi" + window.location.href.substr(23,44));
}
})();
