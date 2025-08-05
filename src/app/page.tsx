'use client';

import React, { useState } from 'react';
import { ExpenseProvider } from '@/hooks/useExpenses';
import { ThemeProvider } from '@/hooks/useTheme';
import { Dashboard, ExpenseForm, ExpenseList, Navigation, CloudExportButton, TopVendors } from '@/components';
import { Expense } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses' | 'add' | 'vendors'>('dashboard');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setActiveTab('add');
  };

  const handleCloseForm = () => {
    setEditingExpense(null);
    setActiveTab('expenses');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Expenses</h2>
              <CloudExportButton />
            </div>
            <ExpenseList onEditExpense={handleEditExpense} />
          </div>
        );
      case 'vendors':
        return <TopVendors />;
      case 'add':
        return (
          <div className="max-w-2xl mx-auto">
            <ExpenseForm 
              onClose={handleCloseForm}
              editingExpense={editingExpense ? {
                id: editingExpense.id,
                amount: editingExpense.amount,
                category: editingExpense.category,
                description: editingExpense.description,
                vendor: editingExpense.vendor,
                date: editingExpense.date,
              } : null}
            />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <ExpenseProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </main>
        </div>
      </ExpenseProvider>
    </ThemeProvider>
  );
}
