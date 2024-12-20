import type { JiraApiConfig, JiraIssue } from '../types/jira';

const EMAIL = 'mai-takahashi@c-fo.com';

export async function fetchJiraIssues(config: JiraApiConfig): Promise<JiraIssue[]> {
  const { domain, token, projectKey } = config;
  
  try {
    const response = await fetch(
      `https://${domain}/rest/api/3/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${EMAIL}:${token}`)}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Atlassian-Token': 'no-check'
        },
        body: JSON.stringify({
          jql: `project = ${projectKey} ORDER BY updated DESC`,
          fields: [
            'summary',
            'status',
            'priority',
            'assignee',
            'created',
            'updated'
          ],
          maxResults: 50
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.errorMessages?.join(', ') || 
        `Failed to fetch Jira issues (${response.status})`
      );
    }

    const data = await response.json();
    return data.issues.map((issue: any) => ({
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status.name,
      priority: issue.fields.priority?.name || 'None',
      assignee: issue.fields.assignee?.displayName,
      created: issue.fields.created,
      updated: issue.fields.updated
    }));
  } catch (error) {
    console.error('Error fetching Jira issues:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch Jira issues');
  }
}