import { JIRA_CONFIG } from '../config';
import { encodeBasicAuth } from '../utils/auth';
import type { JiraApiConfig, JiraApiResponse, JiraIssue } from '../types';
import { transformJiraResponse } from '../utils/transform';

export class DirectJiraAdapter {
  private config: JiraApiConfig;

  constructor(config: JiraApiConfig) {
    this.config = {
      apiVersion: JIRA_CONFIG.API_VERSION,
      ...config
    };
  }

  async fetchIssues(): Promise<JiraIssue[]> {
    try {
      const basicAuth = encodeBasicAuth(JIRA_CONFIG.EMAIL, this.config.token);
      
      const response = await fetch(
        `https://${this.config.domain}/rest/api/${this.config.apiVersion}/search`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            jql: `project = ${this.config.projectKey} ORDER BY ${JIRA_CONFIG.SORT_ORDER}`,
            fields: JIRA_CONFIG.FIELDS,
            maxResults: JIRA_CONFIG.MAX_RESULTS
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errorMessages?.join(', ') || 
          `Failed to fetch Jira issues (${response.status})`
        );
      }

      const data: JiraApiResponse = await response.json();
      return transformJiraResponse(data);
    } catch (error) {
      console.error('Error fetching Jira issues:', error);
      throw error instanceof Error ? error : new Error('Failed to fetch Jira issues');
    }
  }
}