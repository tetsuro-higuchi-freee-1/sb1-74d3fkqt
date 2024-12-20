import { JIRA_CONFIG } from '../constants';

export function getJiraIssueUrl(key: string): string {
  return `${JIRA_CONFIG.BASE_URL}/browse/${key}`;
}

export function isJiraKey(name: string): boolean {
  return /^[A-Z]+-\d+$/.test(name);
}