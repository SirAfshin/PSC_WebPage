import { mountProjectsGrid } from '../components/project-cards.js';
import { applyLanguage, getLang } from '../i18n.js';

function init() {
  mountProjectsGrid('featuredProjects');
  applyLanguage(getLang());
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('psc:langchange', () => {
  mountProjectsGrid('featuredProjects');
  applyLanguage(getLang());
});
