'use client';

import React, { useState } from 'react';
import { Edit2, Trash2, Calendar, Tag, Store } from 'lucide-react';
import { Expense, ExpenseFilters } from '@/types';
import { useExpenses } from '@/hooks/useExpenses';
import { useLanguage } from '@/hooks/useLanguage';
import { formatCurrency, formatDate, getCategoryColor } from '@/lib';
import { ExpenseFiltersComponent } from './ExpenseFilters';

interface ExpenseListProps {
  onEditExpense?: (expense: Expense) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ onEditExpense }) => {
  const { getFilteredExpenses, deleteExpense } = useExpenses();
  const { t } = useLanguage();
  const [filters, setFilters] = useState<ExpenseFilters>({});
  
  // Helper function to get translated category name
  const getCategoryName = (category: string): string => {
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
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredExpenses = getFilteredExpenses(filters);

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: 'date' | 'amount' | 'category') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDelete = (expense: Expense) => {
    if (window.confirm(`${t('confirmDelete')} "${expense.description}"?`)) {
      deleteExpense(expense.id);
    }
  };

  const getSortIcon = (field: 'date' | 'amount' | 'category') => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div>
      <ExpenseFiltersComponent filters={filters} onFiltersChange={setFilters} />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('expenses')} ({sortedExpenses.length})
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('total')}: {formatCurrency(sortedExpenses.reduce((sum, expense) => sum + expense.amount, 0))}
            </div>
          </div>
        </div>

        {sortedExpenses.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">{t('noExpensesFoundCriteria')}</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('date')}
                    >
                      {t('dateLabel')} {getSortIcon('date')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('descriptionLabel')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('category')}
                    >
                      {t('categoryLabel')} {getSortIcon('category')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('vendorLabel')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('amount')}
                    >
                      {t('amountLabel')} {getSortIcon('amount')}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedExpenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {formatDate(expense.date)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {expense.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(expense.category)}`}>
                          {getCategoryName(expense.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {expense.vendor || t('unknown')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(expense.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          {onEditExpense && (
                            <button
                              onClick={() => onEditExpense(expense)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 p-1"
                              title={t('editExpense')}
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(expense)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1"
                            title={t('deleteExpense')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              {sortedExpenses.map((expense) => (
                <div key={expense.id} className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{expense.description}</h3>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(expense.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {getCategoryName(expense.category)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Store className="h-3 w-3" />
                          {expense.vendor || t('unknown')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(expense.amount)}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {onEditExpense && (
                          <button
                            onClick={() => onEditExpense(expense)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 p-1"
                            title={t('editExpense')}
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(expense)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1"
                          title={t('deleteExpense')}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(expense.category)}`}>
                    {getCategoryName(expense.category)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};