import React from 'react';
import { Settings, AlertCircle, XCircle } from 'lucide-react';
import { JiraConfig } from './JiraConfig';
import { JiraEmailConfig } from './JiraEmailConfig';
import { JiraProjectKeyConfig } from './JiraProjectKeyConfig';
import { JiraAdapterSelector } from './JiraAdapterSelector';
import { useJiraIssues } from '../../hooks/useJiraIssues';
import { JiraIssueList } from './JiraIssueList';
import { useJira } from '../../contexts/JiraContext';

export function JiraSettings() {
  const { 
    config, 
    email,
    projectKey,
    adapterType, 
    setConfig, 
    setEmail,
    setProjectKey,
    clearConfig, 
    setAdapterType 
  } = useJira();
  
  const { issues, isLoading, error } = useJiraIssues(config, { 
    adapterType,
    email: email || undefined,
    projectKey: projectKey || undefined
  });

  const handleJiraConfig = (token: string) => {
    setConfig({
      domain: 'jira-freee.atlassian.net',
      token,
      projectKey: projectKey || 'KNOQ'
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Jira連携設定
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Jiraとの連携方法と認証情報を設定します。
        </p>
      </div>

      <div className="space-y-4">
        <JiraEmailConfig 
          email={email} 
          onSave={setEmail} 
        />

        <JiraProjectKeyConfig
          projectKey={projectKey}
          onSave={setProjectKey}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            連携方式
          </label>
          <JiraAdapterSelector value={adapterType} onChange={setAdapterType} />
        </div>

        {!config ? (
          <JiraConfig onSave={handleJiraConfig} />
        ) : (
          <div className="bg-green-50 p-4 rounded-md">
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Jiraと接続済み
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>APIトークンが保存されています</p>
                  </div>
                </div>
              </div>
              <button
                onClick={clearConfig}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XCircle className="h-4 w-4 mr-1" />
                接続解除
              </button>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">接続テスト</h4>
          <JiraIssueList
            issues={issues}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}