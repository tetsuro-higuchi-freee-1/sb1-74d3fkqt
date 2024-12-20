import { mockIssues } from './data/issues';
import type { JiraApiConfig, JiraIssue } from '../../types';

export class MockJiraAdapter {
  private config: JiraApiConfig;

  constructor(config: JiraApiConfig) {
    this.config = config;
  }

  async fetchIssues(): Promise<JiraIssue[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 500));
    return mockIssues;
  }
}