import { JIRA_CONFIG } from './constants';
import { transformJiraResponse } from './utils';
import type { JiraApiConfig, JiraIssue } from './types';

export async function fetchJiraIssues(config: JiraApiConfig): Promise<JiraIssue[]> {
  try {
    const response = await fetch(
      `${JIRA_CONFIG.BASE_URL}/rest/api/${JIRA_CONFIG.API_VERSION}/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${JIRA_CONFIG.EMAIL}:${config.token}`)}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jql: `project = ${JIRA_CONFIG.PROJECT_KEY} ORDER BY ${JIRA_CONFIG.SORT_ORDER}`,
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

    const data = await response.json();
    return transformJiraResponse(data);
  } catch (error) {
    console.error('Error fetching Jira issues:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch Jira issues');
  }
}