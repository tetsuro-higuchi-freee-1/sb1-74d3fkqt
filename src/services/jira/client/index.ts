import type { JiraApiConfig, JiraIssue, ErrorResponse } from '../types/generated';

export class JiraClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async fetchIssues(config: JiraApiConfig): Promise<JiraIssue[]> {
    try {
      const response = await fetch(`${this.baseUrl}/jira/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        const errorData = await response.json() as ErrorResponse;
        throw new Error(errorData.message || 'Failed to fetch Jira issues');
      }

      const { issues } = await response.json();
      return issues;
    } catch (error) {
      console.error('Error in JiraClient:', error);
      throw error instanceof Error ? error : new Error('Failed to fetch Jira issues');
    }
  }
}