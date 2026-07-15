import fa from './locales/fa.js';
import en from './locales/en.js';
import ar from './locales/ar.js';

const STORAGE_KEY = 'site-lang';
const LANG_ORDER = ['fa', 'en', 'ar'];

/** @type {Record<string, Record<string, string>>} */
const translations = { fa, en, ar };

/** @type {Record<string, string>} */
let adminOverrides = {};

/** @returns {'fa' | 'en' | 'ar'} */
export function getLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LANG_ORDER.includes(stored)) return /** @type {'fa' | 'en' | 'ar'} */ (stored);
  return 'fa';
}

/** @param {string} key */
export function t(key) {
  const lang = getLang();
  const admin = adminOverrides[lang] || {};
  if (admin[key]) return admin[key];
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

/** @param {'fa' | 'en' | 'ar'} lang */
export function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  applyLanguage(lang);
}

export function cycleLang() {
  const current = getLang();
  const idx = LANG_ORDER.indexOf(current);
  const next = LANG_ORDER[(idx + 1) % LANG_ORDER.length];
  setLang(next);
}

/** @param {'fa' | 'en' | 'ar'} lang */
function applyLanguage(lang) {
  const dict = translations[lang] || translations.fa;
  const admin = adminOverrides[lang] || {};

  const isRtl = lang === 'fa' || lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const value = admin[key] ?? dict[key];
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const value = admin[key] ?? dict[key];
    if (value !== undefined) el.setAttribute('placeholder', value);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (!key) return;
    const value = admin[key] ?? dict[key];
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n');
    if (key) {
      const value = admin[key] ?? dict[key];
      if (value) document.title = value;
    }
  }

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    const key = metaDesc.getAttribute('data-i18n-content');
    if (key) {
      const value = admin[key] ?? dict[key];
      if (value) metaDesc.setAttribute('content', value);
    }
  }

  document.querySelectorAll('[data-admin-key]').forEach((el) => {
    const key = el.getAttribute('data-admin-key');
    if (!key) return;
    const value = admin[key];
    if (value) el.textContent = value;
  });

  document.querySelectorAll('[data-admin-href-key]').forEach((el) => {
    const key = el.getAttribute('data-admin-href-key');
    if (!key) return;
    const value = admin[key];
    if (value) {
      const prefix = el.getAttribute('data-admin-href-prefix') || '';
      el.setAttribute('href', prefix + value);
    }
  });

  document.body.setAttribute('data-lang', lang);

  const langCurrent = document.getElementById('langCurrent');
  if (langCurrent) {
    const labels = { fa: 'FA', en: 'EN', ar: 'AR' };
    langCurrent.textContent = labels[lang] || 'FA';
  }

  document.querySelectorAll('.lang-option').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
  });

  document.dispatchEvent(new CustomEvent('psc:langchange', { detail: { lang } }));
}

async function loadAdminContent() {
  try {
    const res = await fetch('/api/content');
    const data = await res.json();
    if (data?.ok && data.content) {
      adminOverrides = data.content;
      applyLanguage(getLang());
    }
  } catch {
    /* keep defaults */
  }
}

export function initI18n() {
  applyLanguage(getLang());
  loadAdminContent();
}

export { applyLanguage };
