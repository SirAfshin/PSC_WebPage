/**
 * content-loader.js — applies admin-editable overrides on top of the
 * static translations from i18n.js.
 *
 * Elements that admins can edit from /admin carry a data-admin-key
 * attribute (textContent override) and/or data-admin-href-key +
 * data-admin-href-prefix (href override, e.g. for mailto: links).
 *
 * Runs once on load, then re-applies automatically whenever the
 * language is switched (i18n.js dispatches a "psc:langchange" event).
 */
(function () {
  let content = null; // { en: {...}, fa: {...} }

  function currentLang() {
    return document.documentElement.lang === 'fa' ? 'fa' : 'en';
  }

  function apply() {
    if (!content) return;
    const lang = currentLang();
    const values = content[lang] || {};

    document.querySelectorAll('[data-admin-key]').forEach((el) => {
      const key = el.getAttribute('data-admin-key');
      const value = values[key];
      if (value !== undefined && value !== null && value !== '') {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-admin-href-key]').forEach((el) => {
      const key = el.getAttribute('data-admin-href-key');
      const value = values[key];
      if (value !== undefined && value !== null && value !== '') {
        const prefix = el.getAttribute('data-admin-href-prefix') || '';
        el.setAttribute('href', prefix + value);
      }
    });
  }

  async function load() {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data && data.ok) {
        content = data.content;
        apply();
      }
    } catch {
      // If this fails, the page simply keeps its default static text —
      // never block rendering on the admin-content fetch.
    }
  }

  document.addEventListener('DOMContentLoaded', load);
  document.addEventListener('psc:langchange', apply);
})();
