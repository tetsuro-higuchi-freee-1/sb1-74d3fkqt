/* eslint-disable */
// This file was automatically generated based on the OpenAPI schema.
// Do not modify it manually.

export interface JiraApiConfig {
  /** Jira domain */
  domain: string;
  /** API token for authentication */
  token: string;
  /** Jira project key */
  projectKey: string;
  /** Jira REST API version */
  apiVersion?: string;
}

export interface JiraIssue {
  /** Issue ID */
  id: string;
  /** Issue key */
  key: string;
  /** Issue summary */
  summary: string;
  /** Current status */
  status: string;
  /** Issue priority */
  priority: string;
  /** Assigned user's display name */
  assignee?: string | null;
  /** Creation timestamp */
  created: string;
  /** Last update timestamp */
  updated: string;
}

export interface ErrorResponse {
  /** Error message */
  message: string;
  /** Detailed error messages */
  errorMessages?: string[];
}

export interface FetchJiraIssuesResponse {
  issues: JiraIssue[];
}