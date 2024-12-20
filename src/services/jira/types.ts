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
  token: string;
}

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