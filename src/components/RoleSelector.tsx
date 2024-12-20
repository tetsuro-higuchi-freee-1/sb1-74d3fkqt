import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types/auth';

export function RoleSelector() {
  const { login, user, logout } = useAuth();

  const roles: { value: UserRole; label: string }[] = [
    { value: 'sales', label: '営業担当' },
    { value: 'product_manager', label: 'プロダクトマネージャー' },
    { value: 'product_owner', label: 'プロダクトオーナー' }
  ];

  return (
    <div className="flex items-center space-x-4">
      <select
        className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        value={user?.role || ''}
        onChange={(e) => login(e.target.value as UserRole)}
      >
        <option value="" disabled>
          ロールを選択
        </option>
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
      {user && (
        <button
          onClick={logout}
          className="px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
        >
          ログアウト
        </button>
      )}
    </div>
  );
}