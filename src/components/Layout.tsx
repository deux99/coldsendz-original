
import React from 'react';
import { useAuth } from '../lib/auth';

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function Layout({ children, sidebar }: LayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen bg-slate-50 overflow-hidden flex">
      {/* Sidebar Slot */}
      {sidebar}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Glass Header */}
        <header className="glass z-10 sticky top-0 px-8 py-4 flex items-center justify-end">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-600 to-indigo-600">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}