// ==UserScript==
// @name        TikTok Privacy Frontend Redirect
// @namespace   https://github.com/ShadowTux/ProjectTechify
// @version     1.1
// @description Redirects TikTok to ProxiTok privacy frontend
// @match       *://*.tiktok.com/*
// @author      shadowtux
// @grant       none
// @run-at      document-start
// @updateURL   https://raw.githubusercontent.com/ShadowTux/ProjectTechify/main/user-scripts/tiktok-to-proxytok.js
// @downloadURL https://raw.githubusercontent.com/ShadowTux/ProjectTechify/main/user-scripts/tiktok-to-proxytok.js
// ==/UserScript==

const newHost = 'proxitok.pussthecat.org';
const oldHosts = ['www.tiktok.com', 'tiktok.com'];

const currentHost = window.location.hostname;

if (oldHosts.includes(currentHost)) {
  const newUrl = window.location.href.replace(currentHost, newHost);
  window.location.replace(newUrl);
}
