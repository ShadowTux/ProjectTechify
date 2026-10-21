// ==UserScript==
// @name         Sanoma cookie banner bypass (no consent)
// @namespace    local.sanoma.cmp-bypass
// @version      1.1.0
// @description  Hides the Sourcepoint consent prompt on Sanoma news sites (is.fi, hs.fi, aamulehti.fi, satakunnankansa.fi, taloussanomat.fi) without granting consent or breaking the sites. No consent is given and tracking remains disabled.
// @updateURL    https://github.com/ShadowTux/ProjectTechify/raw/refs/heads/main/user-scripts/sanoma-cookie-banner-bypass.user.js
// @downloadURL  https://github.com/ShadowTux/ProjectTechify/raw/refs/heads/main/user-scripts/sanoma-cookie-banner-bypass.user.js
// @match        https://www.is.fi/*
// @match        https://is.fi/*
// @match        https://www.hs.fi/*
// @match        https://hs.fi/*
// @match        https://www.aamulehti.fi/*
// @match        https://aamulehti.fi/*
// @match        https://www.satakunnankansa.fi/*
// @match        https://satakunnankansa.fi/*
// @match        https://www.taloussanomat.fi/*
// @match        https://taloussanomat.fi/*
// @run-at       document-start
// @noframes
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Sanoma loads a Sourcepoint CMP
  // (cdn.privacy-mgmt.com/unified/wrapperMessagingWithoutDetection.js) via
  // Adobe Launch on all five news brands. It renders the banner as
  // div#sp_message_container_<msgid> containing iframe#sp_message_iframe_<msgid>,
  // and while the banner is shown it sets <html class="sp-message-open"> plus a
  // scroll-lock stylesheet. We neutralize both and leave everything else alone.
  // No accept button is ever clicked and no consent cookie or localStorage entry
  // is written, so tracking tags stay consent-gated and off.
  var CSS = [
    // Banner container and iframe: never render, never intercept clicks.
    '[id^="sp_message_container"] { display: none !important; visibility: hidden !important; pointer-events: none !important; }',
    'iframe[id^="sp_message_iframe"] { display: none !important; }',

    // Undo the scroll lock. The doubled class raises specificity above the
    // wrapper's own injected "html.sp-message-open body { ... !important }"
    // rules, which are appended later in document order.
    'html.sp-message-open.sp-message-open { height: auto !important; width: auto !important; overflow: auto !important; }',
    'html.sp-message-open.sp-message-open body { overflow: visible !important; position: static !important; margin-top: 0 !important; }'
  ].join('\n');

  function installStyle() {
    if (document.getElementById('sanoma-cmp-bypass')) return;
    var el = document.createElement('style');
    el.id = 'sanoma-cmp-bypass';
    el.textContent = CSS;
    (document.head || document.documentElement).appendChild(el);
  }

  function stripScrollLock() {
    var root = document.documentElement;
    if (root.classList && root.classList.contains('sp-message-open')) {
      root.classList.remove('sp-message-open');
    }
    // Belt and braces in case the wrapper ever applies the lock inline.
    if (document.body) {
      var b = document.body.style;
      if (b.position === 'fixed') b.position = '';
      if (b.marginTop && b.marginTop.indexOf('-') === 0) b.marginTop = '';
      if (b.overflow === 'hidden') b.overflow = '';
    }
  }

  installStyle();
  stripScrollLock();

  // The wrapper can add the lock class at any point after the message is
  // fetched, so keep watching for it for the lifetime of the page.
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].type === 'attributes') stripScrollLock();
    }
  });

  function startObserving() {
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    if (document.body) {
      observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
    }
  }

  if (document.body) {
    startObserving();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      installStyle();
      stripScrollLock();
      startObserving();
    });
  }
})();
