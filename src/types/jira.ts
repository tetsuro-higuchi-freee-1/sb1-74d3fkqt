export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  status: string;
  priority: string;
  assignee?: string;
  created: string;
  updated: string;
}

export interface JiraApiConfig {
  domain: string;
  token: string;
  projectKey: string;
}