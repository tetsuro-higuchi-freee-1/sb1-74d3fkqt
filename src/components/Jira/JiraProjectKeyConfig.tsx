import React, { useState } from 'react';
import { Key } from 'lucide-react';

interface JiraProjectKeyConfigProps {
  projectKey: string | null;
  onSave: (key: string) => void;
}

export function JiraProjectKeyConfig({ projectKey, onSave }: JiraProjectKeyConfigProps) {
  const [newKey, setNewKey] = useState(projectKey || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newKey.toUpperCase());
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
        <Key className="h-5 w-5 mr-2" />
        プロジェクトキー設定
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Jiraのプロジェクトキーを設定します。
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="projectKey" className="block text-sm font-medium text-gray-700">
            プロジェクトキー
          </label>
          <input
            type="text"
            id="projectKey"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="例: KNOQ"
            pattern="[A-Za-z0-9]+"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm uppercase"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            半角英数字のみ使用できます
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          保存
        </button>
      </form>
    </div>
  );
}