// Domain Types
export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  status: string;
  priority: string;
  assignee?: string;
  created: string;
  updated: string;
}

export interface JiraStatus {
  name: string;
  colorClass: string;
}

export interface JiraPriority {
  name: string;
  iconName: string;
  colorClass: string;
}