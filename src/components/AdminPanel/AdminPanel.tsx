import React from 'react';
import { Users, Settings } from 'lucide-react';
import { UserManagement } from '../UserManagement/UserManagement';
import { useAuth } from '../../contexts/AuthContext';

export function AdminPanel() {
  const { user } = useAuth();

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg mt-8">
      <div className="px-4 py-5 sm:p-6">
        <div className="border-b border-gray-200 pb-5">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900 flex items-center">
            <Settings className="h-6 w-6 mr-2" />
            管理者パネル
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            ユーザーとロールの管理を行うことができます
          </p>
        </div>

        <div className="mt-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                ユーザー管理
              </h4>
              <UserManagement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}