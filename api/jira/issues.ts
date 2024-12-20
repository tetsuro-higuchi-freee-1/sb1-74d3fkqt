import type { JiraApiConfig } from '../../src/types/jira';
import { JIRA_ISSUE_FIELDS, JIRA_MAX_RESULTS, JIRA_SORT_ORDER } from '../../src/services/jira/constants';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { domain, token, projectKey, apiVersion } = req.body;

  try {
    const response = await fetch(
      `https://${domain}/rest/api/${apiVersion}/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(token + ':').toString('base64')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jql: `project = ${projectKey} ORDER BY ${JIRA_SORT_ORDER}`,
          fields: JIRA_ISSUE_FIELDS,
          maxResults: JIRA_MAX_RESULTS
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({
        message: error.errorMessages?.join(', ') || 'Failed to fetch Jira issues'
      });
    }

    const data = await response.json();
    
    // Transform the response to match our frontend types
    const issues = data.issues.map(issue => ({
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status.name,
      priority: issue.fields.priority?.name || 'None',
      assignee: issue.fields.assignee?.displayName,
      created: issue.fields.created,
      updated: issue.fields.updated
    }));

    return res.status(200).json({ issues });
  } catch (error) {
    console.error('Error proxying Jira request:', error);
    return res.status(500).json({ 
      message: 'Internal server error while fetching Jira issues'
    });
  }
}