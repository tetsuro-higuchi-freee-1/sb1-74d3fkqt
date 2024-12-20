import { useMemo } from 'react';
import { mapJiraIssueToFeature } from '../services/jira/utils/mapper';
import type { JiraIssue } from '../services/jira/types';
import type { Product } from '../types/roadmap';

export function useJiraFeatures(issues: JiraIssue[]): Product[] {
  return useMemo(() => {
    return issues.map(issue => ({
      id: issue.id,
      ...mapJiraIssueToFeature(issue)
    }));
  }, [issues]);
}