export const JIRA_CONFIG = {
  API_VERSION: '3',
  MAX_RESULTS: 50,
  EMAIL: 'mai-takahashi@c-fo.com',
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