export const JIRA_CONFIG = {
  API_VERSION: '3',
  MAX_RESULTS: 50,
  EMAIL: 'mai-takahashi@c-fo.com',
  BASE_URL: 'https://jira-freee.atlassian.net',
  PROJECT_KEY: 'KNOQ',
  FIELDS: [
    'summary',
    'status',
    'priority',
    'assignee',
    'created',
    'updated'
  ] as const,
  SORT_ORDER: 'updated DESC'
} as const;

export const JIRA_STATUS_COLORS = {
  'open': 'bg-gray-100 text-gray-800',
  'to do': 'bg-gray-100 text-gray-800',
  'in progress': 'bg-blue-100 text-blue-800',
  'done': 'bg-green-100 text-green-800',
  'blocked': 'bg-red-100 text-red-800',
  'on hold': 'bg-red-100 text-red-800'
} as const;

export const JIRA_PRIORITY_ICONS = {
  'highest': { color: 'text-red-500', icon: 'AlertTriangle' },
  'high': { color: 'text-orange-500', icon: 'ArrowUp' },
  'medium': { color: 'text-yellow-500', icon: 'AlertCircle' },
  'low': { color: 'text-blue-500', icon: 'ArrowDown' },
  'lowest': { color: 'text-gray-400', icon: 'Minus' }
} as const;