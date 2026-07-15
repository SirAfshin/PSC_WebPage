let observer = null;

function observeReveal() {
  const selector = '.service-card, .project-card, .about-feature, .about-card, .timeline-step';
  const els = document.querySelectorAll(`${selector}:not(.in)`);

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
  }

  els.forEach((el) => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(observeReveal, 50);
});

document.addEventListener('psc:langchange', () => {
  setTimeout(observeReveal, 50);
});
