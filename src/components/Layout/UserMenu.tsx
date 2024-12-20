import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'sales':
        return '営業担当';
      case 'product_manager':
        return 'プロダクトマネージャー';
      case 'product_owner':
        return 'プロダクトオーナー';
      default:
        return role;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50"
      >
        <User className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-600">
          {user?.name} ({getRoleLabel(user?.role)}
          {user?.isAdmin && ' / 管理者'})
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
              <div className="font-medium truncate">{user?.name}</div>
              <div className="text-gray-500 truncate" title={user?.email}>
                {user?.email}
              </div>
            </div>

            {user?.isAdmin && (
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">管理者パネル</span>
              </Link>
            )}

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">ログアウト</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}