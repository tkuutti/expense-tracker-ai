'use client';

import React, { useState } from 'react';
import { Store, TrendingUp, Users, DollarSign, BarChart3, Eye, EyeOff } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useExpenses } from '@/hooks/useExpenses';
import { useLanguage } from '@/hooks/useLanguage';
import { formatCurrency, formatDate, getCategoryColor } from '@/lib';
import { VendorSummary, ExpenseCategory } from '@/types';

const CATEGORY_COLORS = {
  Food: '#f97316',
  Transportation: '#3b82f6',
  Entertainment: '#8b5cf6',
  Shopping: '#ec4899',
  Bills: '#ef4444',
  Other: '#6b7280',
};

export const TopVendors: React.FC = () => {
  const { getVendorStats } = useExpenses();
  const { t } = useLanguage();
  const vendorStats = getVendorStats();
  
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
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [selectedVendor, setSelectedVendor] = useState<VendorSummary | null>(null);

  // Filter out "Unknown" vendors and get top 10 with actual vendor names
  const topVendorsData = vendorStats.vendorSummaries
    .filter(vendor => vendor.vendor !== 'Unknown' && vendor.vendor.trim() !== '')
    .slice(0, 10)
    .map(vendor => ({
      name: vendor.vendor,
      amount: vendor.totalAmount,
      transactions: vendor.transactionCount,
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
    payload?: Array<{ value: number; dataKey: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
              {entry.dataKey === 'amount' ? t('totalSpent') + ': ' : t('transactionCount') + ': '}
              {entry.dataKey === 'amount' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const VendorDetailModal: React.FC<{ vendor: VendorSummary; onClose: () => void }> = ({ vendor, onClose }) => {
    const categoryData = Object.entries(vendor.categories)
      .filter(([, amount]) => amount > 0)
      .map(([category, amount]) => ({
        name: getCategoryName(category as ExpenseCategory),
        value: amount,
        color: CATEGORY_COLORS[category as ExpenseCategory],
      }));

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{vendor.vendor}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('totalSpent')}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(vendor.totalAmount)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('transactions')}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{vendor.transactionCount}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('averageAmount')}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(vendor.averageAmount)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('lastTransaction')}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(vendor.lastTransactionDate)}</p>
              </div>
            </div>

            {/* Category Breakdown */}
            {categoryData.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('categories')}</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map(({ name, value, color }) => (
                    <div key={name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{name}: {formatCurrency(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (vendorStats.totalVendors === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <Store className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('noExpenses')}</h3>
          <p className="text-gray-500 dark:text-gray-400">{t('startAddingExpensesVendor')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('topVendors')}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'card' ? 'table' : 'card')}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {viewMode === 'card' ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {viewMode === 'card' ? t('tableView') : t('cardView')}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalVendors')}
          value={vendorStats.totalVendors.toString()}
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        
        <StatCard
          title={t('totalSpent')}
          value={formatCurrency(vendorStats.totalSpent)}
          icon={<DollarSign className="h-6 w-6" />}
          color="green"
        />
        
        <StatCard
          title={t('mostExpensiveVendor')}
          value={vendorStats.topVendor?.vendor || 'None'}
          subtitle={vendorStats.topVendor ? formatCurrency(vendorStats.topVendor.totalAmount) : ''}
          icon={<TrendingUp className="h-6 w-6" />}
          color="purple"
        />
        
        <StatCard
          title={t('averagePerVendor')}
          value={formatCurrency(vendorStats.totalSpent / (vendorStats.totalVendors || 1))}
          icon={<BarChart3 className="h-6 w-6" />}
          color="orange"
        />
      </div>

      {/* Top Vendors Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('topVendors')}</h3>
        {topVendorsData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topVendorsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="name"
                  fontSize={12}
                  stroke="#6b7280"
                />
                <YAxis 
                  tickFormatter={(value) => `€${value.toFixed(0)}`}
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
          <div className="h-80 flex flex-col items-center justify-center text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('noVendorDataAvailable')}</h4>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              {t('addVendorInfoMessage')}
            </p>
          </div>
        )}
      </div>

      {/* Vendors List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('totalVendors')}</h3>
        </div>

        {viewMode === 'card' ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendorStats.vendorSummaries.map((vendor) => (
                <div 
                  key={vendor.vendor}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedVendor(vendor)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">{vendor.vendor}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{vendor.transactionCount}x</span>
                  </div>
                  <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {formatCurrency(vendor.totalAmount)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <div>{t('avgShort')} {formatCurrency(vendor.averageAmount)}</div>
                    <div>{t('lastShort')} {formatDate(vendor.lastTransactionDate)}</div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {Object.entries(vendor.categories)
                      .filter(([, amount]) => amount > 0)
                      .slice(0, 3)
                      .map(([category]) => (
                        <span key={category} className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(category as ExpenseCategory)}`}>
                          {category}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('vendor')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('totalSpent')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('transactionCount')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('averagePerVendor')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('lastTransaction')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {vendorStats.vendorSummaries.map((vendor) => (
                  <tr key={vendor.vendor} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{vendor.vendor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(vendor.totalAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {vendor.transactionCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatCurrency(vendor.averageAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatDate(vendor.lastTransactionDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedVendor(vendor)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 text-sm"
                      >
                        {t('viewDetails')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Vendor Detail Modal */}
      {selectedVendor && (
        <VendorDetailModal
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
        />
      )}
    </div>
  );
};