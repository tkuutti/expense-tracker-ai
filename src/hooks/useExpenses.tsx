'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Expense, ExpenseContextType, ExpenseFilters, ExpenseSummary, ExpenseCategory, VendorStats, VendorSummary } from '@/types';
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

      // Vendor filter
      if (filters.vendor && expense.vendor?.toLowerCase() !== filters.vendor.toLowerCase()) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesDescription = expense.description.toLowerCase().includes(query);
        const matchesCategory = expense.category.toLowerCase().includes(query);
        const matchesAmount = expense.amount.toString().includes(query);
        const matchesVendor = expense.vendor?.toLowerCase().includes(query) || false;
        
        if (!matchesDescription && !matchesCategory && !matchesAmount && !matchesVendor) {
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

  const getVendorStats = (): VendorStats => {
    // Group expenses by vendor
    const vendorGroups = expenses.reduce((groups, expense) => {
      const vendor = expense.vendor?.trim() || 'Unknown';
      if (!groups[vendor]) {
        groups[vendor] = [];
      }
      groups[vendor].push(expense);
      return groups;
    }, {} as Record<string, Expense[]>);

    // Calculate vendor summaries
    const vendorSummaries: VendorSummary[] = Object.entries(vendorGroups).map(([vendor, vendorExpenses]) => {
      const totalAmount = vendorExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const transactionCount = vendorExpenses.length;
      const averageAmount = totalAmount / transactionCount;
      
      // Get category breakdown for this vendor
      const categories: Record<ExpenseCategory, number> = {
        Food: 0,
        Transportation: 0,
        Entertainment: 0,
        Shopping: 0,
        Bills: 0,
        Other: 0,
      };
      
      vendorExpenses.forEach(expense => {
        categories[expense.category] += expense.amount;
      });

      // Find the most recent transaction date
      const lastTransactionDate = vendorExpenses
        .map(expense => expense.date)
        .sort()
        .reverse()[0];

      return {
        vendor,
        totalAmount,
        transactionCount,
        averageAmount,
        categories,
        lastTransactionDate,
      };
    });

    // Sort by total amount (descending)
    vendorSummaries.sort((a, b) => b.totalAmount - a.totalAmount);

    const totalVendors = vendorSummaries.length;
    const topVendor = vendorSummaries.length > 0 ? vendorSummaries[0] : null;
    const totalSpent = vendorSummaries.reduce((sum, vendor) => sum + vendor.totalAmount, 0);

    return {
      totalVendors,
      topVendor,
      vendorSummaries,
      totalSpent,
    };
  };

  const value: ExpenseContextType = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getFilteredExpenses,
    getSummary,
    getVendorStats,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};