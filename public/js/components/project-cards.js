import { FEATURED_PROJECTS } from '../data/projects.js';
import { t } from '../i18n.js';

const ICONS = {
  optimization: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  simulation: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83"/></svg>',
  modeling: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 5 5-9"/></svg>',
  ai: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>',
  blockchain: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4"/></svg>',
  geometry: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 22 20 2 20"/><circle cx="12" cy="14" r="3"/></svg>'
};

const ICON_MAP = {
  'phoenix-blockchain': ICONS.blockchain,
  'supply-chain': ICONS.simulation,
  'geometric-architecture': ICONS.geometry,
  'ai-healthcare': ICONS.ai
};

/**
 * @param {import('../data/projects.js').FEATURED_PROJECTS[number]} project
 */
export function renderProjectCard(project) {
  const icon = ICON_MAP[project.slug] || ICONS.modeling;
  return `
    <a href="/projects/${project.slug}" class="project-card reveal" style="--card-accent:${project.accent}">
      <div class="project-card-visual">
        <div class="project-card-visual-pattern" aria-hidden="true"></div>
        <div class="project-card-icon">${icon}</div>
        <span class="project-card-tag" data-i18n="${project.categoryKey}">${t(project.categoryKey)}</span>
      </div>
      <div class="project-card-body">
        <h3 data-i18n="${project.titleKey}">${t(project.titleKey)}</h3>
        <p data-i18n="${project.summaryKey}">${t(project.summaryKey)}</p>
        <span class="project-card-arrow" data-i18n="project.view">مشاهده</span>
      </div>
    </a>`;
}

/**
 * @param {string} containerId
 */
export function mountProjectsGrid(containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  grid.innerHTML = FEATURED_PROJECTS.map(renderProjectCard).join('');
}
