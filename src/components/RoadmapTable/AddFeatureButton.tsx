import React from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { rolePermissions } from '../../types/auth';

interface AddFeatureButtonProps {
  onClick: () => void;
}

export function AddFeatureButton({ onClick }: AddFeatureButtonProps) {
  const { user } = useAuth();
  const permissions = user ? rolePermissions[user.role] : rolePermissions.sales;

  if (!permissions.canAdd) return null;

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Plus className="h-5 w-5 mr-2" />
      機能を追加
    </button>
  );
}