'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Expense, ExpenseContextType, ExpenseFilters, ExpenseSummary, ExpenseCategory } from '@/types';
import { storage, generateId } from '@/lib';
import { startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

interface ExpenseProviderProps {
  children: React.ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const loadedExpenses = storage.getExpenses();
    setExpenses(loadedExpenses);
  }, []);

  const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    storage.saveExpenses(updatedExpenses);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === id
        ? { ...expense, ...updates, updatedAt: new Date().toISOString() }
        : expense
    );
    setExpenses(updatedExpenses);
    storage.saveExpenses(updatedExpenses);
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    storage.saveExpenses(updatedExpenses);
  };

  const getFilteredExpenses = (filters: ExpenseFilters): Expense[] => {
    return expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);

      // Category filter
      if (filters.category && filters.category !== 'All' && expense.category !== filters.category) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && filters.dateTo) {
        if (!isWithinInterval(expenseDate, { start: filters.dateFrom, end: filters.dateTo })) {
          return false;
        }
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesDescription = expense.description.toLowerCase().includes(query);
        const matchesCategory = expense.category.toLowerCase().includes(query);
        const matchesAmount = expense.amount.toString().includes(query);
        
        if (!matchesDescription && !matchesCategory && !matchesAmount) {
          return false;
        }
      }

      return true;
    });
  };

  const getSummary = (): ExpenseSummary => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
    });

    const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categorySummary: Record<ExpenseCategory, number> = {
      Food: 0,
      Transportation: 0,
      Entertainment: 0,
      Shopping: 0,
      Bills: 0,
      Other: 0,
    };

    expenses.forEach(expense => {
      categorySummary[expense.category] += expense.amount;
    });

    const topCategory = Object.entries(categorySummary).reduce(
      (max, [category, amount]) => 
        amount > (max?.amount || 0) ? { category: category as ExpenseCategory, amount } : max,
      null as { category: ExpenseCategory; amount: number } | null
    );

    return {
      totalExpenses,
      monthlyTotal,
      categorySummary,
      topCategory,
    };
  };

  const value: ExpenseContextType = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getFilteredExpenses,
    getSummary,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};