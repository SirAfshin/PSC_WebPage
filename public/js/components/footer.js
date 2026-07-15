export function renderFooter() {
  return `
<footer>
  <div class="container footer-inner">
    <div class="footer-brand">
      <a href="/" class="brand brand-footer">
        <img src="/assets/logos/psc-logo.svg" alt="" class="brand-logo" width="32" height="32">
        <span class="brand-name" data-i18n="nav.brand">PSC</span>
      </a>
      <p class="footer-tagline" data-i18n="footer.tagline">ریاضیات · آمار · هوش مصنوعی</p>
    </div>
    <div class="footer-contact">
      <a href="mailto:psc@aut.ac.ir" data-bidi-isolate data-admin-key="contact.emailValue" data-admin-href-key="contact.emailValue" data-admin-href-prefix="mailto:" data-i18n="contact.emailValue">psc@aut.ac.ir</a>
      <span data-i18n="cta.address">دانشگاه صنعتی امیرکبیر، دانشکده ریاضی و علوم کامپیوتر، مرکز حل مسئله</span>
    </div>
    <div class="footer-social">
      <span class="footer-social-label" data-i18n="footer.social">شبکه‌های اجتماعی</span>
      <div class="social-links">
        <a href="#" class="social-link" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
        <a href="#" class="social-link" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
      </div>
    </div>
    <p class="footer-copy">© <span id="year"></span> <span data-i18n="nav.brand">PSC</span> — <span data-i18n="footer.copyright">تمامی حقوق محفوظ است.</span></p>
  </div>
</footer>`;
}
