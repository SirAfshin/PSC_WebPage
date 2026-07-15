export function renderNavbar({ minimal = false } = {}) {
  const links = minimal
    ? ''
    : `
      <ul class="nav-links" id="navLinks">
        <li><a href="/#services" data-i18n="nav.services">خدمات</a></li>
        <li><a href="/projects" data-i18n="nav.projects">پروژه‌ها</a></li>
        <li><a href="/about" data-i18n="nav.about">درباره ما</a></li>
        <li><a href="/workflow" data-i18n="nav.workflow">همکاری</a></li>
      </ul>`;

  const cta = minimal
    ? ''
    : `<a href="/contact" class="btn btn-primary btn-sm nav-submit" data-i18n="nav.submit">ارسال مسئله</a>`;

  return `
<nav class="nav">
  <div class="container nav-row">
    <a href="/" class="brand">
      <img src="/assets/logos/psc-logo.svg" alt="" class="brand-logo" width="36" height="36">
      <span class="brand-name" data-i18n="nav.brand">PSC</span>
    </a>
    ${links}
    <div class="nav-cta">
      ${cta}
      <div class="lang-dropdown" id="langDropdown">
        <button class="icon-btn lang-dropdown-toggle" id="langToggle" type="button" data-i18n-aria-label="nav.lang" aria-label="Language" aria-expanded="false" aria-haspopup="listbox">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span class="lang-current" id="langCurrent">FA</span>
        </button>
        <ul class="lang-dropdown-menu" id="langMenu" role="listbox">
          <li><button type="button" role="option" data-lang="fa" class="lang-option">فارسی</button></li>
          <li><button type="button" role="option" data-lang="en" class="lang-option">English</button></li>
          <li><button type="button" role="option" data-lang="ar" class="lang-option">العربية</button></li>
        </ul>
      </div>
      <button class="icon-btn theme-toggle" id="themeToggle" type="button" data-i18n-aria-label="nav.theme" aria-label="Theme" aria-pressed="false"></button>
      ${minimal ? '' : `<button class="nav-toggle" id="navToggle" type="button" data-i18n-aria-label="nav.toggleMenu" aria-label="Toggle menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>`}
    </div>
  </div>
</nav>`;
}
