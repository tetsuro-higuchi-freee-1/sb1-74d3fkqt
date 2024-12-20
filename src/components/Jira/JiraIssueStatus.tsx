import React from 'react';
import { getStatusColor } from '../../services/jira/utils';

interface JiraIssueStatusProps {
  status: string;
}

export function JiraIssueStatus({ status }: JiraIssueStatusProps) {
  const colorClass = getStatusColor(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
}