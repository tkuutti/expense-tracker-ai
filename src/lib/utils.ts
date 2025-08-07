import { ExpenseCategory } from '@/types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fi-FI', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Finnish number formatting utilities
export const parseFinishNumber = (value: string): number => {
  if (!value || value.trim() === '') return 0;
  
  // First validate the format
  if (!isValidFinishNumber(value)) return 0;
  
  // Replace comma with dot for parsing
  const normalizedValue = value.replace(',', '.');
  const parsed = parseFloat(normalizedValue);
  
  return isNaN(parsed) ? 0 : parsed;
};

export const formatFinishNumber = (value: number): string => {
  // Format number with Finnish locale (comma as decimal separator)
  return value.toLocaleString('fi-FI', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const isValidFinishNumber = (value: string): boolean => {
  if (!value || value.trim() === '') return false;
  
  // Finnish number format: allows digits, one comma for decimal separator
  const finnishNumberRegex = /^\d+([,]\d{1,2})?$/;
  return finnishNumberRegex.test(value.trim());
};

export const getCategoryColor = (category: ExpenseCategory): string => {
  const colors: Record<ExpenseCategory, string> = {
    Food: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Transportation: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Bills: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };
  return colors[category];
};

export const exportToCSV = (data: Record<string, string | number>[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};