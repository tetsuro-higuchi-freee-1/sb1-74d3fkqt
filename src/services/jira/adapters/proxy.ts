import type { JiraApiConfig, JiraIssue } from '../types';
import { JiraClient } from '../client';

export class ProxyJiraAdapter {
  private client: JiraClient;
  private config: JiraApiConfig;
  private email: string;
  private projectKey: string;

  constructor(config: JiraApiConfig, email: string, projectKey: string) {
    this.client = new JiraClient();
    this.config = config;
    this.email = email;
    this.projectKey = projectKey;
  }

  async fetchIssues(): Promise<JiraIssue[]> {
    try {
      const requestConfig = {
        ...this.config,
        email: this.email,
        projectKey: this.projectKey
      };
      return await this.client.fetchIssues(requestConfig);
    } catch (error) {
      console.error('Error fetching Jira issues through proxy:', error);
      throw error instanceof Error ? error : new Error('Failed to fetch Jira issues');
    }
  }
}