// Jira API Response Types
export interface JiraApiResponse {
  issues: Array<{
    id: string;
    key: string;
    fields: {
      summary: string;
      status: { name: string };
      priority?: { name: string };
      assignee?: { displayName: string };
      created: string;
      updated: string;
    };
  }>;
  total: number;
  maxResults: number;
}

export interface JiraApiError {
  message: string;
  errorMessages: string[];
}

// Jira API Config
export interface JiraApiConfig {
  domain: string;
  token: string;
  projectKey: string;
  apiVersion?: string;
}