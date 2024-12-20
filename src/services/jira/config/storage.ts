const STORAGE_KEYS = {
  CONFIG: 'jira_config',
  EMAIL: 'jira_email',
  PROJECT_KEY: 'jira_project_key',
  ADAPTER_TYPE: 'jira_adapter_type'
} as const;

export function saveJiraConfig(config: JiraApiConfig): void {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
}

export function loadJiraConfig(): JiraApiConfig | null {
  const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
  return stored ? JSON.parse(stored) : null;
}

export function clearJiraConfig(): void {
  localStorage.removeItem(STORAGE_KEYS.CONFIG);
}

export function saveJiraEmail(email: string): void {
  localStorage.setItem(STORAGE_KEYS.EMAIL, email);
}

export function loadJiraEmail(): string | null {
  return localStorage.getItem(STORAGE_KEYS.EMAIL);
}

export function clearJiraEmail(): void {
  localStorage.removeItem(STORAGE_KEYS.EMAIL);
}

export function saveProjectKey(key: string): void {
  localStorage.setItem(STORAGE_KEYS.PROJECT_KEY, key);
}

export function loadProjectKey(): string | null {
  return localStorage.getItem(STORAGE_KEYS.PROJECT_KEY);
}

export function clearProjectKey(): void {
  localStorage.removeItem(STORAGE_KEYS.PROJECT_KEY);
}

export function saveAdapterType(type: string): void {
  localStorage.setItem(STORAGE_KEYS.ADAPTER_TYPE, type);
}

export function loadAdapterType(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ADAPTER_TYPE);
}

export function clearAdapterType(): void {
  localStorage.removeItem(STORAGE_KEYS.ADAPTER_TYPE);
}