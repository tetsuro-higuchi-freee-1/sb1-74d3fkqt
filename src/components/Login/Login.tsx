import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../types/user';

export function Login() {
  const { login } = useAuth();
  const [loginType, setLoginType] = useState<'admin' | 'member'>('member');

  const handleLogin = (role: UserRole) => {
    login(role, loginType === 'admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ロードマップ
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ログインタイプを選択してください
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setLoginType('admin')}
            className={`px-4 py-2 rounded-md ${
              loginType === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            管理者
          </button>
          <button
            onClick={() => setLoginType('member')}
            className={`px-4 py-2 rounded-md ${
              loginType === 'member'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            メンバー
          </button>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleLogin('product_owner')}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            プロダクトオーナーとしてログイン
          </button>
          <button
            onClick={() => handleLogin('product_manager')}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            プロダクトマネージャーとしてログイン
          </button>
          <button
            onClick={() => handleLogin('sales')}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            営業担当としてログイン
          </button>
        </div>
      </div>
    </div>
  );
}