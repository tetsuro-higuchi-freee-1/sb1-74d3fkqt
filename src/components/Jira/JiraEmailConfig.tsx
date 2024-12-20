import React, { useState } from 'react';
import { Mail } from 'lucide-react';

interface JiraEmailConfigProps {
  email: string | null;
  onSave: (email: string) => void;
}

export function JiraEmailConfig({ email, onSave }: JiraEmailConfigProps) {
  const [newEmail, setNewEmail] = useState(email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newEmail);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
        <Mail className="h-5 w-5 mr-2" />
        メールアドレス設定
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        JiraのBasic認証に使用するメールアドレスを設定します。
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="例: username@example.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
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