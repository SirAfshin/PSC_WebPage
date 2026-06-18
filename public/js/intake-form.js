document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('intakeForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById('name').value,
      organization: document.getElementById('org').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      problem: document.getElementById('problem').value,
      outcome: document.getElementById('outcome').value,
      timeline: document.getElementById('timeline').value,
      support: document.getElementById('support').value,
      data: document.getElementById('data').value,
      confidentiality: document.getElementById('confidentiality').value
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

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
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
      alert('Something went wrong submitting your request. Please try again or email us directly.');
    }
  });
});
