/* ============================================================
   LuXTech Innovation — service detail pages (shared behaviour)
   - Header language dropdown (6 languages, matches the homepage)
   - Language choice is shared with the homepage via localStorage
   - Body copy is fully translated per page via window.PAGE_I18N,
     defined in a page-specific <slug>.i18n.js loaded before this
     file (e.g. software-development.i18n.js). NAV_I18N below
     covers only the shared chrome (nav / back-link).
   - IntersectionObserver scroll reveals (respects reduced motion)
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'lx_lang';
  var SUPPORTED = ['ro', 'en', 'lb', 'fr', 'de', 'sk'];

  var NAV_I18N = {
    en: { nav_home:'Home', nav_software:'Software', nav_ai:'Applied AI', nav_pm:'Project Delivery', nav_contact:'Contact',
          back_to_services:'Back to services' },
    ro: { nav_home:'Acasă', nav_software:'Software', nav_ai:'AI Aplicat', nav_pm:'Management de Proiect', nav_contact:'Contact',
          back_to_services:'Înapoi la servicii' },
    fr: { nav_home:'Accueil', nav_software:'Logiciel', nav_ai:'IA Appliquée', nav_pm:'Gestion de Projet', nav_contact:'Contact',
          back_to_services:'Retour aux services' },
    de: { nav_home:'Start', nav_software:'Software', nav_ai:'Angewandte KI', nav_pm:'Projektmanagement', nav_contact:'Kontakt',
          back_to_services:'Zurück zu den Leistungen' },
    lb: { nav_home:'Doheem', nav_software:'Software', nav_ai:'Ugewannten AI', nav_pm:'Projetmanagement', nav_contact:'Kontakt',
          back_to_services:'Zréck zu de Servicer' },
    sk: { nav_home:'Domov', nav_software:'Softvér', nav_ai:'Aplikovaná AI', nav_pm:'Projektový manažment', nav_contact:'Kontakt',
          back_to_services:'Späť na služby' }
  };

  var PAGE_I18N = window.PAGE_I18N || {};

  var state = { lang: 'en' };

  function readStored() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function writeStored(v) {
    try { localStorage.setItem(STORE_KEY, v); } catch (e) {}
  }

  function applyLang(lang) {
    state.lang = lang;
    var navT = NAV_I18N[lang] || NAV_I18N.en;
    var pageT = PAGE_I18N[lang] || PAGE_I18N.en || {};
    var pageEn = PAGE_I18N.en || {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var value = navT[k];
      if (value === undefined) value = pageT[k];
      if (value === undefined) value = NAV_I18N.en[k];
      if (value === undefined) value = pageEn[k];
      if (value !== undefined && value !== '') el.textContent = value;
    });
  }

  /* ---- Language dropdown (same behaviour + a11y as the homepage) ---- */
  var lang     = document.getElementById('lang');
  var langBtn  = document.getElementById('langBtn');
  var langMenu = document.getElementById('langMenu');
  var current  = document.getElementById('langCurrent');

  if (lang && langBtn && langMenu && current) {
    var options = Array.prototype.slice.call(langMenu.querySelectorAll('[role="option"]'));

    var openMenu = function (focusActive) {
      lang.classList.add('open');
      langBtn.setAttribute('aria-expanded', 'true');
      var i = options.findIndex(function (o) { return o.dataset.val === state.lang; });
      if (focusActive) setFocus(i < 0 ? 0 : i);
    };
    var closeMenu = function (returnFocus) {
      lang.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
      options.forEach(function (o) { o.classList.remove('focus'); });
      if (returnFocus) langBtn.focus();
    };
    var setFocus = function (i) {
      options.forEach(function (o, k) { o.classList.toggle('focus', k === i); });
      if (options[i]) options[i].scrollIntoView({ block: 'nearest' });
      langMenu.dataset.focus = i;
    };
    var selectLang = function (val) {
      current.textContent = val.toUpperCase();
      options.forEach(function (o) { o.setAttribute('aria-selected', String(o.dataset.val === val)); });
      document.documentElement.lang = val;
      writeStored(val);
      applyLang(val);
    };

    langBtn.addEventListener('click', function () {
      lang.classList.contains('open') ? closeMenu(false) : openMenu(true);
    });
    options.forEach(function (o) {
      o.addEventListener('click', function () { selectLang(o.dataset.val); closeMenu(true); });
    });
    langBtn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMenu(true); langMenu.focus(); }
    });
    langMenu.addEventListener('keydown', function (e) {
      var i = parseInt(langMenu.dataset.focus || '0', 10);
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocus(Math.min(options.length - 1, i + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setFocus(Math.max(0, i - 1)); }
      else if (e.key === 'Home') { e.preventDefault(); setFocus(0); }
      else if (e.key === 'End') { e.preventDefault(); setFocus(options.length - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectLang(options[i].dataset.val); closeMenu(true); }
      else if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); }
    });
    document.addEventListener('click', function (e) { if (!lang.contains(e.target)) closeMenu(false); });

    (function initLang() {
      var stored = readStored();
      var def;
      if (stored && SUPPORTED.indexOf(stored) !== -1) {
        def = stored;
      } else {
        var u = (navigator.language || 'en').toLowerCase();
        def = SUPPORTED.find(function (l) { return u.indexOf(l) === 0; }) || 'en';
      }
      selectLang(def);
    })();
  } else {
    applyLang('en');
  }

  /* ---- Reveal on scroll ---- */
  (function reveals() {
    if (!document.documentElement.classList.contains('js-anim')) return;
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) {
      if (e.getBoundingClientRect().top < window.innerHeight) { e.classList.add('in'); }
      else { io.observe(e); }
    });
  })();

  /* ---- Header: transparent at top, solid after scroll (matches homepage) ---- */
  (function headerScroll() {
    var header = document.querySelector('header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();
})();
