'use client';

import React from 'react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Pie, Tooltip } from 'recharts';
import { useExpenses } from '@/hooks/useExpenses';
import { useLanguage } from '@/hooks/useLanguage';
import { formatCurrency } from '@/lib';
import { ExpenseCategory } from '@/types';

const CATEGORY_COLORS = {
  Food: '#ef4444',      // Red
  Transportation: '#22d3ee', // Cyan  
  Entertainment: '#3b82f6', // Blue
  Shopping: '#f59e0b',  // Yellow
  Bills: '#10b981',     // Green
  Other: '#6b7280',     // Gray
};

const CATEGORY_ICONS = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Bills: '💡',
  Other: '📦',
};

export const MonthlyInsights: React.FC = () => {
  const { getSummary } = useExpenses();
  const { t } = useLanguage();
  const summary = getSummary();
  
  // Helper function to get translated category name
  const getCategoryName = (category: ExpenseCategory): string => {
    switch (category) {
      case 'Food': return t('food');
      case 'Transportation': return t('transportation');
      case 'Entertainment': return t('entertainment');
      case 'Shopping': return t('shopping');
      case 'Bills': return t('bills');
      case 'Other': return t('other');
      default: return category;
    }
  };

  const pieChartData = Object.entries(summary.categorySummary)
    .filter(([, amount]) => amount > 0)
    .map(([category, amount]) => ({
      name: getCategoryName(category as ExpenseCategory),
      value: amount,
      color: CATEGORY_COLORS[category as ExpenseCategory],
    }));

  const budgetStreak = 12; // Mock data - you can implement budget tracking logic

  const PieTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
  }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / summary.totalExpenses) * 100).toFixed(1);
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow">
          <p className="font-medium text-gray-900 dark:text-white">
            {payload[0].name}: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  if (summary.totalExpenses === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('noExpenses')}</h3>
        <p className="text-gray-500 dark:text-gray-400">{t('startAddingExpenses')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('monthlyInsights')}</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Pie Chart Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Chart */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="h-80 w-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={40}
                      dataKey="value"
                      stroke="#1f2937"
                      strokeWidth={3}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg border-2 border-gray-800 dark:border-white">
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">{t('spending')}</span>
                </div>
              </div>
              
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="flex-1 space-y-4">
            {Object.entries(summary.categorySummary)
              .filter(([, amount]) => amount > 0)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([category, amount]) => (
                <div key={category} className="flex items-center gap-4 p-4 border-l-4" 
                     style={{ borderLeftColor: CATEGORY_COLORS[category as ExpenseCategory] }}>
                  <span className="text-2xl">{CATEGORY_ICONS[category as ExpenseCategory]}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {getCategoryName(category as ExpenseCategory)}: {formatCurrency(amount)}
                    </div>
                  </div>
                </div>
              ))}
            
          </div>
        </div>

        {/* Budget Streak Section */}
        <div className="mt-8">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('budgetStreak')}</h2>
            <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">{budgetStreak}</div>
            <div className="text-base text-gray-600 dark:text-gray-400 mb-4">{t('days')}</div>
            
            {/* Progress indicator */}
            <div className="flex justify-center">
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (budgetStreak / 30) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};