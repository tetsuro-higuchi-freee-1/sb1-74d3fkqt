import { mockIssues } from './data/issues';
import type { JiraIssue } from '../../types';

// Simulate network delay with random variation
const MOCK_DELAY = Math.floor(Math.random() * 500) + 500; // 500-1000ms

self.onmessage = async () => {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  self.postMessage({ issues: mockIssues });
};