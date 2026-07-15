import { t, getLang } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('intakeForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      faculty: document.getElementById('faculty').value,
      problem: document.getElementById('problem').value
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = t('contact.sending');

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Request failed');

      form.classList.add('hide');
      success.classList.add('show');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
      alert(t('contact.error'));
    }
  });
});

document.addEventListener('psc:langchange', () => {
  const submitBtn = document.querySelector('#intakeForm button[type="submit"]');
  if (submitBtn && !submitBtn.disabled) {
    submitBtn.textContent = t('contact.submit');
  }
});
