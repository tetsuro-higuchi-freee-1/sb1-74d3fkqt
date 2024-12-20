import { JIRA_STATUS_COLORS, JIRA_PRIORITY_ICONS } from './constants';
import type { JiraApiResponse, JiraIssue } from './types';

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

export function getStatusColor(status: string): string {
  return JIRA_STATUS_COLORS[status.toLowerCase()] || JIRA_STATUS_COLORS['open'];
}

export function getPriorityIcon(priority: string) {
  const config = JIRA_PRIORITY_ICONS[priority.toLowerCase()] || JIRA_PRIORITY_ICONS['lowest'];
  return {
    name: config.icon,
    color: config.color
  };
}

export function formatJiraDate(date: string): string {
  return new Date(date).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}