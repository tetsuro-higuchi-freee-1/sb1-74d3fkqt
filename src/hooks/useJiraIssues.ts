import { useState, useEffect, useCallback } from 'react';
import { createJiraAdapter } from '../services/jira/factory';
import type { JiraIssue, JiraApiConfig } from '../services/jira/types';
import type { JiraAdapterType } from '../services/jira/factory';

interface UseJiraIssuesOptions {
  adapterType?: JiraAdapterType;
  email?: string;
  projectKey?: string;
}

export function useJiraIssues(config: JiraApiConfig | null, options: UseJiraIssuesOptions = {}) {
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadIssues = useCallback(async () => {
    if (!config) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const adapter = createJiraAdapter(
        options.adapterType || 'direct',
        config,
        options.email,
        options.projectKey
      );
      const data = await adapter.fetchIssues();
      setIssues(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch Jira issues'));
    } finally {
      setIsLoading(false);
    }
  }, [config, options.adapterType, options.email, options.projectKey]);

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  return { issues, isLoading, error, refresh: loadIssues };
}