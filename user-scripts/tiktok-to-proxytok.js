// ==UserScript==
// @name        TikTok Privacy Frontend Redirect
// @match       *://*.tiktok.com/*
// @run-at      document-start
// @grant       none
// ==/UserScript==

const newHost = 'proxitok.pussthecat.org';
const oldHosts = ['www.tiktok.com', 'tiktok.com'];

const currentHost = window.location.hostname;

if (oldHosts.includes(currentHost)) {
  const newUrl = window.location.href.replace(currentHost, newHost);
  window.location.replace(newUrl);
}
