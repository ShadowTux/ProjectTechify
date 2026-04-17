// ==UserScript==
// @name         Mastodon Language Filter (FI + EN + SV)
// @namespace    https://example.com/
// @version      1.4
// @description  Hide posts unless their language is Finnish or English on home and tag timelines
// @match        https://infosec.exchange/home*
// @match        https://infosec.exchange/web/home*
// @match        https://infosec.exchange/tags/*
// @match        https://infosec.exchange/web/tags/*

// @match        https://mastodon.social/home*
// @match        https://mastodon.social/web/home*
// @match        https://mastodon.social/tags/*
// @match        https://mastodon.social/web/tags/*

// @match        https://mastodon.online/home*
// @match        https://mastodon.online/web/home*
// @match        https://mastodon.online/tags/*
// @match        https://mastodon.online/web/tags/*

// @match        https://fosstodon.org/home*
// @match        https://fosstodon.org/web/home*
// @match        https://fosstodon.org/tags/*
// @match        https://fosstodon.org/web/tags/*

// @match        https://mastodon.uno/home*
// @match        https://mastodon.uno/web/home*
// @match        https://mastodon.uno/tags/*
// @match        https://mastodon.uno/web/tags/*

// @match        https://mas.to/home*
// @match        https://mas.to/web/home*
// @match        https://mas.to/tags/*
// @match        https://mas.to/web/tags/*

// @match        https://c.im/home*
// @match        https://c.im/web/home*
// @match        https://c.im/tags/*
// @match        https://c.im/web/tags/*

// @match        https://hachyderm.io/home*
// @match        https://hachyderm.io/web/home*
// @match        https://hachyderm.io/tags/*
// @match        https://hachyderm.io/web/tags/*

// @match        https://mstdn.jp/home*
// @match        https://mstdn.jp/web/home*
// @match        https://mstdn.jp/tags/*
// @match        https://mstdn.jp/web/tags/*

// @match        https://universeodon.com/home*
// @match        https://universeodon.com/web/home*
// @match        https://universeodon.com/tags/*
// @match        https://universeodon.com/web/tags/*

// @match        https://mastodon.party/home*
// @match        https://mastodon.party/web/home*
// @match        https://mastodon.party/tags/*
// @match        https://mastodon.party/web/tags/*

// @match        https://mastodon.art/home*
// @match        https://mastodon.art/web/home*
// @match        https://mastodon.art/tags/*
// @match        https://mastodon.art/web/tags/*

// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/ShadowTux/ProjectTechify/main/user-scripts/mastodon-language-filter.js
// @downloadURL  https://raw.githubusercontent.com/ShadowTux/ProjectTechify/main/user-scripts/mastodon-language-filter.js
// ==/UserScript==

/*
The MIT License (MIT)

Copyright (c) 2026 ShadowTux

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

// ==/UserScript==

(() => {
  'use strict';
//  const ALLOWED = new Set(['de']);
//  just add language that you want to see in the timeline.
//  List can be cound here: https://fedi.tips/language-codes-used-by-mastodon/
  const ALLOWED = new Set(['fi', 'en', 'sv']);
  const HIDE_CLASS = 'tm-lang-hidden';
  const STYLE_ID = 'tm-masto-lang-filter-style';

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .${HIDE_CLASS} {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function detectLang(status) {
    const icon = status.querySelector('.status__info__icons .text-icon');
    if (!icon) return null;

    const short = (icon.textContent || '').trim().toLowerCase();
    if (short === 'fi' || short === 'en') return short;

    const title = (icon.getAttribute('title') || '').trim().toLowerCase();
    if (title.includes('finnish') || title.includes('suomi')) return 'fi';
    if (title.includes('english')) return 'en';

    return short || null;
  }

  function shouldRunHere() {
    const path = location.pathname;
    return (
      path === '/home' ||
      path.startsWith('/web/home') ||
      path.startsWith('/tags/') ||
      path.startsWith('/web/tags/')
    );
  }

  function filterStatuses(root = document) {
    if (!shouldRunHere()) return;

    const statuses = root.querySelectorAll('.status');

    for (const status of statuses) {
      const lang = detectLang(status);

      if (lang && ALLOWED.has(lang)) {
        status.classList.remove(HIDE_CLASS);
      } else {
        status.classList.add(HIDE_CLASS);
      }
    }
  }

  function start() {
    installStyle();
    filterStatuses();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;

          if (node.matches('.status')) {
            filterStatuses(node.parentElement || document);
          } else if (node.querySelector('.status')) {
            filterStatuses(node);
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('popstate', () => setTimeout(() => filterStatuses(), 250));
    window.addEventListener('load', () => setTimeout(() => filterStatuses(), 250));
    setInterval(() => filterStatuses(), 2000);
  }

  start();
})();