import React, { useState } from 'react';
import { useAuth } from '../lib/auth';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const navigation = [
    { id: 'compose', name: 'Run Campaign', icon: 'campaign', description: 'Start new email campaigns' },
    { id: 'analytics', name: 'Campaign Progress', icon: 'chart', description: 'Track your campaigns' },
    { id: 'campaigns', name: 'Campaign History', icon: 'history', description: 'View past campaigns' },
    { id: 'recipients', name: 'Import Recipients', icon: 'users', description: 'Manage your audience' },
    { id: 'senders', name: 'Manage Senders', icon: 'mail', description: 'Configure sender accounts' },
    { id: 'templates', name: 'Email Templates', icon: 'template', description: 'Create stunning emails' },
  ];

  const adminNavigation = [
    { id: 'user-management', name: 'User Management', icon: 'admin', description: 'Manage user accounts' },
  ];

  const getIcon = (iconName: string) => {
    const iconClass = "w-5 h-5";
    switch (iconName) {
      case 'campaign':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case 'chart':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'history':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'users':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'template':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'admin':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      default:
        return <span className={iconClass}>{iconName}</span>;
    }
  };

  const renderNavSection = (items: typeof navigation, title: string, startIndex = 0) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
          {title}
        </h2>
      </div>

      <nav className="space-y-1">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`group relative w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ease-out ${activeSection === item.id
                ? 'bg-primary-50 text-primary-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            style={{
              animationDelay: `${(startIndex + index) * 50}ms`
            }}
          >
            {/* Active Indicator Bar */}
            {activeSection === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-r-full"></div>
            )}

            {/* Icon */}
            <div className={`mr-3 transition-colors duration-200 ${activeSection === item.id ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'
              }`}>
              {getIcon(item.icon)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">
                {item.name}
              </div>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col overflow-hidden z-20 shadow-soft">
      {/* Brand Header */}
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-white text-lg font-bold">C</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              ColdSendz
            </h1>
            <p className="text-xs text-slate-500 font-medium">Pro Edition</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 overflow-y-auto scrollbar-hide">
        {renderNavSection(navigation, 'Dashboard')}
        {isAdmin && renderNavSection(adminNavigation, 'Administration', navigation.length)}
      </div>

      {/* Footer / Version */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-xs text-slate-500 text-center">v2.0.0 &copy; 2025</p>
        </div>
      </div>
    </div>
  );
}