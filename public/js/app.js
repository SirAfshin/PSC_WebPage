import { initI18n, setLang } from './i18n.js';
import { initTheme } from './theme.js';
import { mount } from './components/mount.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

function initLangDropdown() {
  const dropdown = document.getElementById('langDropdown');
  const toggle = document.getElementById('langToggle');
  const menu = document.getElementById('langMenu');
  if (!dropdown || !toggle || !menu || dropdown.dataset.bound === 'true') return;

  dropdown.dataset.bound = 'true';

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) setLang(/** @type {'fa'|'en'|'ar'} */ (lang));
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(/** @type {Node} */ (e.target))) {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function initNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  initLangDropdown();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function initLayout() {
  const navSlot = document.querySelector('[data-component="navbar"]');
  if (navSlot) {
    const minimal = navSlot.dataset.minimal === 'true';
    mount('[data-component="navbar"]', renderNavbar({ minimal }));
  }

  const footerSlot = document.querySelector('[data-component="footer"]');
  if (footerSlot) mount('[data-component="footer"]', renderFooter());
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  initI18n();
  initTheme();
  initNav();
});

document.addEventListener('psc:langchange', () => {
  initTheme();
});
