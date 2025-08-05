'use client';

import React from 'react';
import { BarChart3, List, Plus, DollarSign, Store } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavigationProps {
  activeTab: 'dashboard' | 'expenses' | 'add' | 'vendors';
  onTabChange: (tab: 'dashboard' | 'expenses' | 'add' | 'vendors') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
    { id: 'expenses' as const, label: 'Expenses', icon: List },
    { id: 'vendors' as const, label: 'Top Vendors', icon: Store },
    { id: 'add' as const, label: 'Add Expense', icon: Plus },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 dark:bg-blue-500 p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Expense Tracker</h1>
          </div>

          {/* Navigation Tabs and Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex space-x-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};