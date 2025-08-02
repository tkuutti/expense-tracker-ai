'use client';

import React from 'react';
import { DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Pie } from 'recharts';
import { useExpenses } from '@/hooks/useExpenses';
import { formatCurrency, getCategoryColor } from '@/lib';
import { ExpenseCategory } from '@/types';

const CATEGORY_COLORS = {
  Food: '#f97316',
  Transportation: '#3b82f6',
  Entertainment: '#8b5cf6',
  Shopping: '#ec4899',
  Bills: '#ef4444',
  Other: '#6b7280',
};

export const Dashboard: React.FC = () => {
  const { getSummary } = useExpenses();
  const summary = getSummary();

  const pieChartData = Object.entries(summary.categorySummary)
    .filter(([, amount]) => amount > 0)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
      color: CATEGORY_COLORS[category as ExpenseCategory],
    }));

  const barChartData = Object.entries(summary.categorySummary)
    .map(([category, amount]) => ({
      category,
      amount,
    }));

  const StatCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    subtitle?: string;
    color?: string;
  }> = ({ title, value, icon, subtitle, color = 'blue' }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900`}>
          <div className={`text-${color}-600 dark:text-${color}-400`}>{icon}</div>
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow">
          <p className="font-medium text-gray-900 dark:text-white">{`${label}: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow">
          <p className="font-medium text-gray-900 dark:text-white">{`${payload[0].name}: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {((payload[0].value / summary.totalExpenses) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Expenses"
          value={formatCurrency(summary.totalExpenses)}
          icon={<DollarSign className="h-6 w-6" />}
          color="blue"
        />
        
        <StatCard
          title="This Month"
          value={formatCurrency(summary.monthlyTotal)}
          icon={<Calendar className="h-6 w-6" />}
          color="green"
        />
        
        <StatCard
          title="Top Category"
          value={summary.topCategory?.category || 'None'}
          subtitle={summary.topCategory ? formatCurrency(summary.topCategory.amount) : ''}
          icon={<TrendingUp className="h-6 w-6" />}
          color="purple"
        />
        
        <StatCard
          title="Categories"
          value={Object.values(summary.categorySummary).filter(amount => amount > 0).length.toString()}
          subtitle="with expenses"
          icon={<PieChart className="h-6 w-6" />}
          color="orange"
        />
      </div>

      {/* Charts */}
      {summary.totalExpenses > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Spending by Category</h3>
            {pieChartData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No expenses to display
              </div>
            )}
          </div>

          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Breakdown</h3>
            {barChartData.some(item => item.amount > 0) ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis 
                      dataKey="category" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={12}
                      stroke="#6b7280"
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value}€`}
                      fontSize={12}
                      stroke="#6b7280"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="amount" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No expenses to display
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category Details */}
      {summary.totalExpenses > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(summary.categorySummary)
              .filter(([, amount]) => amount > 0)
              .sort(([,a], [,b]) => b - a)
              .map(([category, amount]) => {
                const percentage = ((amount / summary.totalExpenses) * 100).toFixed(1);
                return (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(category as ExpenseCategory)}`}>
                        {category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(amount)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{percentage}%</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {summary.totalExpenses === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <DollarSign className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No expenses yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Start tracking your expenses to see analytics and insights here.</p>
        </div>
      )}
    </div>
  );
};