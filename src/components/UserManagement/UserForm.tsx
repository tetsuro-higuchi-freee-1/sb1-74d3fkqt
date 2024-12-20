import React from 'react';
import type { User, UserFormData } from '../../types/user';
import type { UserRole } from '../../types/auth';

interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData & { isAdmin: boolean }) => void;
  onCancel: () => void;
  currentUserIsAdmin: boolean;
}

export function UserForm({ user, onSubmit, onCancel, currentUserIsAdmin }: UserFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const userData = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      role: formData.get('role') as UserRole,
      isAdmin: formData.get('isAdmin') === 'true'
    };

    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          defaultValue={user?.email}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          名前
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={user?.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          ロール
        </label>
        <select
          name="role"
          id="role"
          required
          defaultValue={user?.role}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="sales">営業担当</option>
          <option value="product_manager">プロダクトマネージャー</option>
          <option value="product_owner">プロダクトオーナー</option>
        </select>
      </div>

      {currentUserIsAdmin && (
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            value="true"
            defaultChecked={user?.isAdmin}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">
            管理者権限を付与
          </label>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {user ? '更新' : '追加'}
        </button>
      </div>
    </form>
  );
}