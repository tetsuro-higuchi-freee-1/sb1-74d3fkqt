import type { JiraApiConfig } from './types';

const STORAGE_KEY = 'jira_config';

export function saveJiraConfig(config: JiraApiConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function loadJiraConfig(): JiraApiConfig | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function clearJiraConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}