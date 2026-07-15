/** @typedef {{ slug: string, titleKey: string, summaryKey: string, categoryKey: string, accent: string }} Project */

/** @type {Project[]} */
export const FEATURED_PROJECTS = [
  {
    slug: 'phoenix-blockchain',
    titleKey: 'project.phoenix.title',
    summaryKey: 'project.phoenix.summary',
    categoryKey: 'project.phoenix.category',
    accent: '#1e3a5f'
  },
  {
    slug: 'supply-chain',
    titleKey: 'project.supply.title',
    summaryKey: 'project.supply.summary',
    categoryKey: 'project.supply.category',
    accent: '#2d5a4a'
  },
  {
    slug: 'geometric-architecture',
    titleKey: 'project.geometry.title',
    summaryKey: 'project.geometry.summary',
    categoryKey: 'project.geometry.category',
    accent: '#5a4a3d'
  },
  {
    slug: 'ai-healthcare',
    titleKey: 'project.health.title',
    summaryKey: 'project.health.summary',
    categoryKey: 'project.health.category',
    accent: '#4a3d6b'
  }
];

/** @type {Record<string, { detailKey: string, methodKey: string, clientKey?: string, executorsKey?: string }>} */
export const PROJECT_DETAILS = {
  'phoenix-blockchain': {
    detailKey: 'project.phoenix.detail',
    methodKey: 'project.phoenix.method',
    clientKey: 'project.phoenix.client',
    executorsKey: 'project.phoenix.executors'
  },
  'supply-chain': {
    detailKey: 'project.supply.detail',
    methodKey: 'project.supply.method'
  },
  'geometric-architecture': {
    detailKey: 'project.geometry.detail',
    methodKey: 'project.geometry.method',
    clientKey: 'project.geometry.client',
    executorsKey: 'project.geometry.executors'
  },
  'ai-healthcare': {
    detailKey: 'project.health.detail',
    methodKey: 'project.health.method'
  }
};
