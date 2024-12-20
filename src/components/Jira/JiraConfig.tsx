import React, { useState } from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { JIRA_CONFIG } from '../../services/jira/constants';

interface JiraConfigProps {
  onSave: (token: string) => void;
}

export function JiraConfig({ onSave }: JiraConfigProps) {
  const [token, setToken] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(token);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Jira設定</h3>
        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          className="text-gray-400 hover:text-gray-500"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      {showHelp && (
        <div className="mb-4 p-4 bg-blue-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                APIトークンの取得方法
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ol className="list-decimal list-inside space-y-1">
                  <li>Jiraの設定画面を開く</li>
                  <li>左メニューから「セキュリティ」を選択</li>
                  <li>「APIトークンの作成と管理」をクリック</li>
                  <li>「APIトークンを作成」をクリック</li>
                  <li>ラベルを入力してトークンを作成</li>
                  <li>作成されたトークンをコピーして下記に入力</li>
                </ol>
              </div>
              <p className="mt-2 text-sm text-blue-700">
                メールアドレス: {JIRA_CONFIG.EMAIL}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700">
            APIトークン
          </label>
          <input
            type="password"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Jira APIトークンを入力"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500">
            ※ 後で環境変数で管理する予定です
          </p>
        </div>
        <button
          type="submit"
          disabled={!token}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          保存
        </button>
      </form>
    </div>
  );
}