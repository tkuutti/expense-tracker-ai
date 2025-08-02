'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { exportToCSV, formatDate } from '@/lib';

export const ExportButton: React.FC = () => {
  const { expenses } = useExpenses();

  const handleExport = () => {
    if (expenses.length === 0) {
      alert('No expenses to export');
      return;
    }

    const exportData = expenses.map(expense => ({
      Date: formatDate(expense.date),
      Description: expense.description,
      Category: expense.category,
      Amount: expense.amount,
      'Created At': formatDate(expense.createdAt),
    }));

    const filename = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    exportToCSV(exportData, filename);
  };

  return (
    <button
      onClick={handleExport}
      disabled={expenses.length === 0}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </button>
  );
};