/**
 * @param {string} selector
 * @param {string} html
 */
export function mount(selector, html) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = html;
}
