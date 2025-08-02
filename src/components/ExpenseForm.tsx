'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Plus } from 'lucide-react';
import { ExpenseCategory, ExpenseFormData } from '@/types';
import { useExpenses } from '@/hooks/useExpenses';
import { parseFinishNumber, isValidFinishNumber, formatFinishNumber } from '@/lib';
import 'react-datepicker/dist/react-datepicker.css';

interface ExpenseFormProps {
  onClose?: () => void;
  editingExpense?: {
    id: string;
    amount: number;
    category: ExpenseCategory;
    description: string;
    date: string;
  } | null;
}

const CATEGORIES: ExpenseCategory[] = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onClose, editingExpense }) => {
  const { addExpense, updateExpense } = useExpenses();
  
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: editingExpense?.amount ? formatFinishNumber(editingExpense.amount) : '',
    category: editingExpense?.category || 'Food',
    description: editingExpense?.description || '',
    date: editingExpense ? new Date(editingExpense.date) : new Date(),
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ExpenseFormData, string>> = {};

    // Amount validation with Finnish format support
    if (!formData.amount || formData.amount.trim() === '') {
      newErrors.amount = 'Please enter an amount';
    } else if (!isValidFinishNumber(formData.amount)) {
      newErrors.amount = 'Please enter a valid amount (e.g., 15,50)';
    } else {
      const amount = parseFinishNumber(formData.amount);
      if (amount <= 0) {
        newErrors.amount = 'Amount must be greater than 0';
      }
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const expenseData = {
      amount: parseFinishNumber(formData.amount),
      category: formData.category,
      description: formData.description.trim(),
      date: formData.date.toISOString(),
    };

    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
    } else {
      addExpense(expenseData);
    }

    // Reset form
    setFormData({
      amount: '',
      category: 'Food',
      description: '',
      date: new Date(),
    });
    setErrors({});

    if (onClose) {
      onClose();
    }
  };

  const handleInputChange = (field: keyof ExpenseFormData, value: string | Date | ExpenseCategory | null) => {
    if (value === null && field === 'date') {
      return; // Don't allow null dates
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">€</span>
            <input
              type="text"
              id="amount"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.amount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="15,50"
              inputMode="decimal"
            />
          </div>
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>

        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value as ExpenseCategory)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter expense description"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Date Picker */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => handleInputChange('date', date)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            dateFormat="dd.MM.yyyy"
            maxDate={new Date()}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};