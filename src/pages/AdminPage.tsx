import React, { useState } from 'react';
import { Users, Database, ClipboardList, Settings } from 'lucide-react';
import { UserManagement } from '../components/UserManagement/UserManagement';
import { ProductMasterManagement } from '../components/ProductMaster/ProductMasterManagement';
import { OperationLogList } from '../components/OperationLog/OperationLogList';
import { JiraSettings } from '../components/Jira/JiraSettings';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

type AdminTab = 'products' | 'users' | 'logs' | 'settings';

export function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">アクセス権限がありません</h3>
          <p className="mt-2 text-sm text-gray-500">
            このページは管理者のみがアクセスできます。
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('products')}
            className={`${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Database className="h-5 w-5 mr-2" />
            プロダクトマスター
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`${
              activeTab === 'users'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Users className="h-5 w-5 mr-2" />
            ユーザー管理
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`${
              activeTab === 'logs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <ClipboardList className="h-5 w-5 mr-2" />
            操作ログ
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Settings className="h-5 w-5 mr-2" />
            システム設定
          </button>
        </nav>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {activeTab === 'products' && (
            <>
              <div className="border-b border-gray-200 pb-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  プロダクトマスター
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  プロダクトの追加、編集、削除ができます。
                </p>
              </div>
              <div className="mt-6">
                <ProductMasterManagement />
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <>
              <div className="border-b border-gray-200 pb-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  ユーザー管理
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  メンバーの追加、編集、削除、ロールの変更ができます。
                </p>
              </div>
              <div className="mt-6">
                <UserManagement />
              </div>
            </>
          )}

          {activeTab === 'logs' && (
            <>
              <div className="border-b border-gray-200 pb-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2" />
                  操作ログ
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  機能情報の追加・編集・削除の履歴を確認できます。
                </p>
              </div>
              <div className="mt-6">
                <OperationLogList />
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <JiraSettings />
          )}
        </div>
      </div>
    </div>
  );
}