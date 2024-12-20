import type { JiraApiConfig } from './types';
import { DirectJiraAdapter } from './adapters/direct';
import { ProxyJiraAdapter } from './adapters/proxy';
import { MockJiraAdapter } from './adapters/mock';

export type JiraAdapterType = 'direct' | 'proxy' | 'mock';

const JIRA_ADAPTER = import.meta.env.VITE_JIRA_ADAPTER || 'direct';

export function createJiraAdapter(
  type: JiraAdapterType = JIRA_ADAPTER as JiraAdapterType, 
  config: JiraApiConfig,
  email?: string,
  projectKey?: string
) {
  switch (type) {
    case 'direct':
      return new DirectJiraAdapter(config);
    case 'proxy':
      if (!email || !projectKey) {
        throw new Error('Email and project key are required for proxy adapter');
      }
      return new ProxyJiraAdapter(config, email, projectKey);
    case 'mock':
      return new MockJiraAdapter(config);
    default:
      throw new Error(`Unknown adapter type: ${type}`);
  }
}