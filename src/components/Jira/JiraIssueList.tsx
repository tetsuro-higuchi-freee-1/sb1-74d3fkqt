import React from 'react';
import { AlertCircle } from 'lucide-react';
import { JiraIssueStatus } from './JiraIssueStatus';
import { JiraIssuePriority } from './JiraIssuePriority';
import { JIRA_CONFIG } from '../../services/jira/config';
import type { JiraIssue } from '../../services/jira/types';

interface JiraIssueListProps {
  issues: JiraIssue[];
  isLoading: boolean;
  error: Error | null;
}

export function JiraIssueList({ issues, isLoading, error }: JiraIssueListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">Jiraから課題を読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-sm font-medium text-red-800">
            Jiraの課題を取得できませんでした
          </h3>
        </div>
        <div className="mt-2 text-sm text-red-700">
          {error.message}
        </div>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">課題が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              キー
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              概要
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ステータス
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              優先度
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              担当者
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              更新日
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {issues.map((issue) => (
            <tr key={issue.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                <a 
                  href={`${JIRA_CONFIG.BASE_URL}/browse/${issue.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {issue.key}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {issue.summary}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <JiraIssueStatus status={issue.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <JiraIssuePriority priority={issue.priority} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {issue.assignee || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(issue.updated).toLocaleString('ja-JP')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}