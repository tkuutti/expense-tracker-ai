'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import { Search, Filter } from 'lucide-react';
import { ExpenseCategory, ExpenseFilters } from '@/types';
import { useExpenses } from '@/hooks/useExpenses';
import { useLanguage } from '@/hooks/useLanguage';
import 'react-datepicker/dist/react-datepicker.css';

interface ExpenseFiltersProps {
  filters: ExpenseFilters;
  onFiltersChange: (filters: ExpenseFilters) => void;
}

const CATEGORIES: (ExpenseCategory | 'All')[] = ['All', 'Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];

export const ExpenseFiltersComponent: React.FC<ExpenseFiltersProps> = ({ filters, onFiltersChange }) => {
  const { expenses } = useExpenses();
  const { t } = useLanguage();
  
  // Helper function to get translated category name
  const getCategoryName = (category: ExpenseCategory | 'All'): string => {
    if (category === 'All') return t('all');
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
  
  // Get unique vendors from all expenses
  const vendors = Array.from(new Set(expenses.map(expense => expense.vendor).filter(Boolean))).sort();
  
  const updateFilter = (key: keyof ExpenseFilters, value: string | Date | undefined | null) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('filters')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('search')}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              id="search"
              value={filters.searchQuery || ''}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={t('searchExpenses')}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('category')}
          </label>
          <select
            id="category-filter"
            value={filters.category || 'All'}
            onChange={(e) => updateFilter('category', e.target.value === 'All' ? undefined : e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {getCategoryName(category)}
              </option>
            ))}
          </select>
        </div>

        {/* Vendor Filter */}
        <div>
          <label htmlFor="vendor-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('vendor')}
          </label>
          <select
            id="vendor-filter"
            value={filters.vendor || ''}
            onChange={(e) => updateFilter('vendor', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">{t('allVendors')}</option>
            {vendors.map(vendor => (
              <option key={vendor} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>

        {/* Date From */}
        <div>
          <label htmlFor="date-from" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('fromDate')}
          </label>
          <DatePicker
            selected={filters.dateFrom}
            onChange={(date) => updateFilter('dateFrom', date)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            dateFormat="dd.MM.yyyy"
            placeholderText={t('selectStartDate')}
            isClearable
          />
        </div>

        {/* Date To */}
        <div>
          <label htmlFor="date-to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('toDate')}
          </label>
          <DatePicker
            selected={filters.dateTo}
            onChange={(date) => updateFilter('dateTo', date)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            dateFormat="dd.MM.yyyy"
            placeholderText={t('selectEndDate')}
            minDate={filters.dateFrom}
            isClearable
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {(filters.searchQuery || filters.category || filters.vendor || filters.dateFrom || filters.dateTo) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={() => onFiltersChange({})}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
          >
            {t('clearAllFilters')}
          </button>
        </div>
      )}
    </div>
  );
};