import { FEATURED_PROJECTS, PROJECT_DETAILS } from '../data/projects.js';
import { applyLanguage, getLang, t } from '../i18n.js';

function getSlug() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  if (parts[0] === 'projects' && parts[1]) return parts[1];
  return null;
}

function render() {
  const container = document.getElementById('projectDetail');
  if (!container) return;

  const slug = getSlug();
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  const details = PROJECT_DETAILS[slug];

  if (!project || !details) {
    container.innerHTML = `
      <p class="lead">Project not found.</p>
      <a href="/projects" class="btn btn-outline" data-i18n="project.back">بازگشت به پروژه‌ها</a>
    `;
    applyLanguage(getLang());
    return;
  }

  document.title = `${t(project.titleKey)} — PSC`;

  container.innerHTML = `
    <a href="/projects" class="back-link" data-i18n="project.back">بازگشت به پروژه‌ها</a>
    <div class="project-detail-header" style="--card-accent:${project.accent}">
      <span class="project-card-tag" data-i18n="${project.categoryKey}">${t(project.categoryKey)}</span>
    </div>
    <h1 data-i18n="${project.titleKey}">${t(project.titleKey)}</h1>
    <p class="lead" style="margin-top:16px" data-i18n="${project.summaryKey}">${t(project.summaryKey)}</p>
    <p style="margin-top:24px;color:var(--text-muted);line-height:1.7" data-i18n="${details.detailKey}">${t(details.detailKey)}</p>
    <div class="project-detail-meta">
      ${details.clientKey ? `<span><strong data-i18n="project.client">${t('project.client')}</strong>: <span data-i18n="${details.clientKey}">${t(details.clientKey)}</span></span>` : ''}
      ${details.executorsKey ? `<span><strong data-i18n="project.executors">${t('project.executors')}</strong>: <span data-i18n="${details.executorsKey}">${t(details.executorsKey)}</span></span>` : ''}
      <span><strong data-i18n="project.method">${t('project.method')}</strong>: <span data-i18n="${details.methodKey}">${t(details.methodKey)}</span></span>
    </div>
    <div style="margin-top:40px">
      <a href="/contact" class="btn btn-primary" data-i18n="hero.cta">ارسال یک مسئله یا مشکل</a>
    </div>
  `;

  applyLanguage(getLang());
}

document.addEventListener('DOMContentLoaded', render);
document.addEventListener('psc:langchange', render);
