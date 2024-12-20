import type { JiraIssue } from '../types';
import type { Product } from '../../../types/roadmap';

export function mapJiraIssueToFeature(issue: JiraIssue): Omit<Product, 'id'> {
  return {
    name: issue.key,
    majorCategory: 'Jira',
    minorCategory: issue.status,
    featureName: issue.summary,
    description: '',
    developmentStatus: mapJiraStatus(issue.status),
    isPublic: '確認前',
    targetIndustry: '全業種',
    targetScale: '全規模',
    customerImpact: mapJiraPriority(issue.priority),
    releaseDate: issue.updated,
    actualReleaseDate: issue.status === 'Done' ? issue.updated : null,
    projectManager: issue.assignee || '',
    productMarketing: '',
    documentationUrl: '',
    figmaUrl: '',
    createdAt: issue.created,
    updatedAt: issue.updated
  };
}

function mapJiraStatus(status: string): Product['developmentStatus'] {
  const statusMap: Record<string, Product['developmentStatus']> = {
    'To Do': '開発着手前',
    'In Progress': '開発中',
    'Done': '開発完了',
    'Blocked': '開発取りやめ'
  };
  return statusMap[status] || '開発着手前';
}

function mapJiraPriority(priority: string): string {
  const priorityMap: Record<string, string> = {
    'Highest': '高',
    'High': '高',
    'Medium': '中',
    'Low': '低',
    'Lowest': '低'
  };
  return priorityMap[priority] || '中';
}