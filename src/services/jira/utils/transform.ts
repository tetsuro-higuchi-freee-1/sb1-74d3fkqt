import type { JiraApiResponse, JiraIssue } from '../types';

export function transformJiraResponse(response: JiraApiResponse): JiraIssue[] {
  return response.issues.map(issue => ({
    id: issue.id,
    key: issue.key,
    summary: issue.fields.summary,
    status: issue.fields.status.name,
    priority: issue.fields.priority?.name || 'None',
    assignee: issue.fields.assignee?.displayName,
    created: issue.fields.created,
    updated: issue.fields.updated
  }));
}