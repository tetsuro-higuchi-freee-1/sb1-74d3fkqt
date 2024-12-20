import { useState, useCallback } from 'react';
import { useJira } from '../contexts/JiraContext';
import { useJiraIssues } from './useJiraIssues';
import { useJiraFeatures } from './useJiraFeatures';

export function useJiraData() {
  const { config, adapterType } = useJira();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { issues, isLoading, error, refresh } = useJiraIssues(config, { adapterType });
  const jiraFeatures = useJiraFeatures(issues);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refresh();
    } finally {
      setIsRefreshing(false);
    }
  }, [refresh]);

  return {
    features: jiraFeatures,
    isLoading: isLoading || isRefreshing,
    error,
    refresh: handleRefresh
  };
}