import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ExpenseProvider, useExpenses } from '@/hooks/useExpenses';

// Mock storage
jest.mock('@/lib/storage', () => ({
  storage: {
    getExpenses: jest.fn(() => []),
    saveExpenses: jest.fn(),
    clearExpenses: jest.fn(),
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ExpenseProvider>{children}</ExpenseProvider>
);

describe('useExpenses Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should add expense with vendor information', () => {
    const { result } = renderHook(() => useExpenses(), { wrapper });

    act(() => {
      result.current.addExpense({
        amount: 25.50,
        category: 'Food',
        description: 'Lunch at cafe',
        vendor: 'Cafe Central',
        date: '2023-12-25T00:00:00.000Z',
      });
    });

    expect(result.current.expenses).toHaveLength(1);
    expect(result.current.expenses[0]).toMatchObject({
      amount: 25.50,
      category: 'Food',
      description: 'Lunch at cafe',
      vendor: 'Cafe Central',
      date: '2023-12-25T00:00:00.000Z',
    });
    expect(result.current.expenses[0].id).toBeDefined();
    expect(result.current.expenses[0].createdAt).toBeDefined();
    expect(result.current.expenses[0].updatedAt).toBeDefined();
  });

  test('should filter expenses by vendor', () => {
    const { result } = renderHook(() => useExpenses(), { wrapper });

    // Add multiple expenses with different vendors
    act(() => {
      result.current.addExpense({
        amount: 25.50,
        category: 'Food',
        description: 'Lunch',
        vendor: 'Cafe Central',
        date: '2023-12-25T00:00:00.000Z',
      });
      result.current.addExpense({
        amount: 15.00,
        category: 'Food',
        description: 'Coffee',
        vendor: 'Starbucks',
        date: '2023-12-25T00:00:00.000Z',
      });
      result.current.addExpense({
        amount: 30.00,
        category: 'Food',
        description: 'Dinner',
        vendor: 'Cafe Central',
        date: '2023-12-25T00:00:00.000Z',
      });
    });

    const filteredExpenses = result.current.getFilteredExpenses({
      vendor: 'Cafe Central',
    });

    expect(filteredExpenses).toHaveLength(2);
    expect(filteredExpenses.every(expense => expense.vendor === 'Cafe Central')).toBe(true);
  });

  test('should include vendor in search query filter', () => {
    const { result } = renderHook(() => useExpenses(), { wrapper });

    act(() => {
      result.current.addExpense({
        amount: 25.50,
        category: 'Food',
        description: 'Lunch',
        vendor: 'Cafe Central',
        date: '2023-12-25T00:00:00.000Z',
      });
      result.current.addExpense({
        amount: 15.00,
        category: 'Food',
        description: 'Coffee',
        vendor: 'Starbucks',
        date: '2023-12-25T00:00:00.000Z',
      });
    });

    const filteredExpenses = result.current.getFilteredExpenses({
      searchQuery: 'central',
    });

    expect(filteredExpenses).toHaveLength(1);
    expect(filteredExpenses[0].vendor).toBe('Cafe Central');
  });

  test('should generate vendor statistics', () => {
    const { result } = renderHook(() => useExpenses(), { wrapper });

    act(() => {
      result.current.addExpense({
        amount: 25.50,
        category: 'Food',
        description: 'Lunch',
        vendor: 'Cafe Central',
        date: '2023-12-25T00:00:00.000Z',
      });
      result.current.addExpense({
        amount: 30.00,
        category: 'Food',
        description: 'Dinner',
        vendor: 'Cafe Central',
        date: '2023-12-26T00:00:00.000Z',
      });
      result.current.addExpense({
        amount: 15.00,
        category: 'Transportation',
        description: 'Bus ticket',
        vendor: 'Public Transit',
        date: '2023-12-25T00:00:00.000Z',
      });
    });

    const vendorStats = result.current.getVendorStats();

    expect(vendorStats.totalVendors).toBe(2);
    expect(vendorStats.totalSpent).toBe(70.50);
    expect(vendorStats.topVendor?.vendor).toBe('Cafe Central');
    expect(vendorStats.topVendor?.totalAmount).toBe(55.50);
    expect(vendorStats.topVendor?.transactionCount).toBe(2);
    expect(vendorStats.topVendor?.averageAmount).toBe(27.75);

    // Check vendor summaries
    const cafeVendor = vendorStats.vendorSummaries.find(v => v.vendor === 'Cafe Central');
    expect(cafeVendor).toBeDefined();
    expect(cafeVendor?.categories.Food).toBe(55.50);
    expect(cafeVendor?.categories.Transportation).toBe(0);
  });

  test('should update expense with vendor information', () => {
    const { result } = renderHook(() => useExpenses(), { wrapper });

    let expenseId: string;

    act(() => {
      result.current.addExpense({
        amount: 25.50,
        category: 'Food',
        description: 'Lunch',
        vendor: 'Cafe Central',
        date: '2023-12-25T00:00:00.000Z',
      });
      expenseId = result.current.expenses[0].id;
    });

    act(() => {
      result.current.updateExpense(expenseId, {
        vendor: 'Updated Cafe',
        amount: 30.00,
      });
    });

    const updatedExpense = result.current.expenses.find(e => e.id === expenseId);
    expect(updatedExpense?.vendor).toBe('Updated Cafe');
    expect(updatedExpense?.amount).toBe(30.00);
    expect(updatedExpense?.updatedAt).toBeDefined();
  });

  test('should handle empty vendor stats correctly', () => {
    const { result } = renderHook(() => useExpenses(), { wrapper });

    const vendorStats = result.current.getVendorStats();

    expect(vendorStats.totalVendors).toBe(0);
    expect(vendorStats.totalSpent).toBe(0);
    expect(vendorStats.topVendor).toBeNull();
    expect(vendorStats.vendorSummaries).toHaveLength(0);
  });
});