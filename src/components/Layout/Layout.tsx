import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { useAuth } from '../../contexts/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="relative z-50 bg-gray-100">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                <Link to="/" className="hover:text-gray-700">
                  プロダクトロードマップ
                </Link>
              </h1>
              {user && (
                <nav className="flex space-x-4">
                  <Link
                    to="/comments"
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/comments'
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    コメント一覧
                  </Link>
                </nav>
              )}
            </div>
            <UserMenu />
          </div>
        </div>
      </header>
      <main className="relative z-0">
        <div className="max-w-[1920px] mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}