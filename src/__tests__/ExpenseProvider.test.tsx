import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ExpenseProvider, useExpenses } from '@/hooks/useExpenses';
import { Expense, ExpenseCategory } from '@/types';
import { storage } from '@/lib';

// Mock the storage module and generateId
jest.mock('@/lib', () => ({
  ...jest.requireActual('@/lib'),
  storage: {
    getExpenses: jest.fn(),
    saveExpenses: jest.fn(),
    clearExpenses: jest.fn(),
  },
  generateId: jest.fn(() => 'mock-id-123'),
}));

const mockStorage = storage as jest.Mocked<typeof storage>;

// Wrapper component for testing hooks
const createWrapper = ({ children }: { children: React.ReactNode }) => (
  <ExpenseProvider>{children}</ExpenseProvider>
);

describe('ExpenseProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock current date for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Initialization', () => {
    test('loads expenses from storage on mount', () => {
      const mockExpenses: Expense[] = [
        {
          id: '1',
          amount: 25.5,
          category: 'Food',
          description: 'Lunch',
          vendor: 'Restaurant',
          date: '2024-01-15T00:00:00.000Z',
          createdAt: '2024-01-15T10:00:00.000Z',
          updatedAt: '2024-01-15T10:00:00.000Z',
        },
      ];

      mockStorage.getExpenses.mockReturnValue(mockExpenses);

      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      expect(mockStorage.getExpenses).toHaveBeenCalledTimes(1);
      expect(result.current.expenses).toEqual(mockExpenses);
    });

    test('initializes with empty array when no expenses in storage', () => {
      mockStorage.getExpenses.mockReturnValue([]);

      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      expect(result.current.expenses).toEqual([]);
    });
  });

  describe('addExpense', () => {
    test('adds new expense with generated ID and timestamps', () => {
      mockStorage.getExpenses.mockReturnValue([]);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const newExpenseData = {
        amount: 15.5,
        category: 'Transportation' as ExpenseCategory,
        description: 'Bus ticket',
        vendor: 'City Transport',
        date: '2024-01-15T00:00:00.000Z',
      };

      act(() => {
        result.current.addExpense(newExpenseData);
      });

      expect(result.current.expenses).toHaveLength(1);
      expect(result.current.expenses[0]).toEqual({
        ...newExpenseData,
        id: 'mock-id-123',
        createdAt: '2024-01-15T12:00:00.000Z',
        updatedAt: '2024-01-15T12:00:00.000Z',
      });

      expect(mockStorage.saveExpenses).toHaveBeenCalledWith(result.current.expenses);
    });

    test('adds multiple expenses correctly', () => {
      mockStorage.getExpenses.mockReturnValue([]);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const expense1 = {
        amount: 15.5,
        category: 'Transportation' as ExpenseCategory,
        description: 'Bus ticket',
        vendor: 'City Transport',
        date: '2024-01-15T00:00:00.000Z',
      };

      const expense2 = {
        amount: 25.0,
        category: 'Food' as ExpenseCategory,
        description: 'Lunch',
        vendor: 'Restaurant',
        date: '2024-01-15T00:00:00.000Z',
      };

      act(() => {
        result.current.addExpense(expense1);
      });

      act(() => {
        result.current.addExpense(expense2);
      });

      expect(result.current.expenses).toHaveLength(2);
      expect(mockStorage.saveExpenses).toHaveBeenCalledTimes(2);
    });
  });

  describe('updateExpense', () => {
    test('updates existing expense and saves to storage', () => {
      const existingExpense: Expense = {
        id: '1',
        amount: 25.5,
        category: 'Food',
        description: 'Lunch',
        vendor: 'Restaurant',
        date: '2024-01-15T00:00:00.000Z',
        createdAt: '2024-01-15T10:00:00.000Z',
        updatedAt: '2024-01-15T10:00:00.000Z',
      };

      mockStorage.getExpenses.mockReturnValue([existingExpense]);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const updates = {
        amount: 30.0,
        description: 'Updated lunch',
      };

      act(() => {
        result.current.updateExpense('1', updates);
      });

      expect(result.current.expenses[0]).toEqual({
        ...existingExpense,
        ...updates,
        updatedAt: '2024-01-15T12:00:00.000Z',
      });

      expect(mockStorage.saveExpenses).toHaveBeenCalledWith(result.current.expenses);
    });

    test('does not update non-existent expense', () => {
      mockStorage.getExpenses.mockReturnValue([]);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.updateExpense('non-existent', { amount: 50 });
      });

      expect(result.current.expenses).toHaveLength(0);
      expect(mockStorage.saveExpenses).toHaveBeenCalledWith([]);
    });
  });

  describe('deleteExpense', () => {
    test('removes expense and saves to storage', () => {
      const expenses: Expense[] = [
        {
          id: '1',
          amount: 25.5,
          category: 'Food',
          description: 'Lunch',
          vendor: 'Restaurant',
          date: '2024-01-15T00:00:00.000Z',
          createdAt: '2024-01-15T10:00:00.000Z',
          updatedAt: '2024-01-15T10:00:00.000Z',
        },
        {
          id: '2',
          amount: 15.0,
          category: 'Transportation',
          description: 'Bus',
          vendor: 'Transit',
          date: '2024-01-15T00:00:00.000Z',
          createdAt: '2024-01-15T11:00:00.000Z',
          updatedAt: '2024-01-15T11:00:00.000Z',
        },
      ];

      mockStorage.getExpenses.mockReturnValue(expenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.deleteExpense('1');
      });

      expect(result.current.expenses).toHaveLength(1);
      expect(result.current.expenses[0].id).toBe('2');
      expect(mockStorage.saveExpenses).toHaveBeenCalledWith(result.current.expenses);
    });

    test('does nothing when deleting non-existent expense', () => {
      const expenses: Expense[] = [
        {
          id: '1',
          amount: 25.5,
          category: 'Food',
          description: 'Lunch',
          vendor: 'Restaurant',
          date: '2024-01-15T00:00:00.000Z',
          createdAt: '2024-01-15T10:00:00.000Z',
          updatedAt: '2024-01-15T10:00:00.000Z',
        },
      ];

      mockStorage.getExpenses.mockReturnValue(expenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.deleteExpense('non-existent');
      });

      expect(result.current.expenses).toHaveLength(1);
      expect(result.current.expenses[0].id).toBe('1');
    });
  });

  describe('getFilteredExpenses', () => {
    const mockExpenses: Expense[] = [
      {
        id: '1',
        amount: 25.5,
        category: 'Food',
        description: 'Lunch at cafe',
        vendor: 'Cafe Central',
        date: '2024-01-15T00:00:00.000Z',
        createdAt: '2024-01-15T10:00:00.000Z',
        updatedAt: '2024-01-15T10:00:00.000Z',
      },
      {
        id: '2',
        amount: 15.0,
        category: 'Transportation',
        description: 'Bus ticket',
        vendor: 'City Transit',
        date: '2024-01-10T00:00:00.000Z',
        createdAt: '2024-01-10T10:00:00.000Z',
        updatedAt: '2024-01-10T10:00:00.000Z',
      },
    ];

    test('filters by category', () => {
      mockStorage.getExpenses.mockReturnValue(mockExpenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const filtered = result.current.getFilteredExpenses({ category: 'Food' });
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].category).toBe('Food');
    });

    test('filters by vendor', () => {
      mockStorage.getExpenses.mockReturnValue(mockExpenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const filtered = result.current.getFilteredExpenses({ vendor: 'Cafe Central' });
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].vendor).toBe('Cafe Central');
    });

    test('filters by date range', () => {
      mockStorage.getExpenses.mockReturnValue(mockExpenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const filtered = result.current.getFilteredExpenses({
        dateFrom: new Date('2024-01-12T00:00:00.000Z'),
        dateTo: new Date('2024-01-16T00:00:00.000Z'),
      });
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('1'); // Only expense from 2024-01-15
    });

    test('filters by search query', () => {
      mockStorage.getExpenses.mockReturnValue(mockExpenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const filtered = result.current.getFilteredExpenses({ searchQuery: 'cafe' });
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].description).toContain('cafe');
    });

    test('returns all expenses when category is "All"', () => {
      mockStorage.getExpenses.mockReturnValue(mockExpenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const filtered = result.current.getFilteredExpenses({ category: 'All' });
      
      expect(filtered).toHaveLength(2);
    });
  });

  describe('getSummary', () => {
    test('calculates expense summary correctly', () => {
      const mockExpenses: Expense[] = [
        {
          id: '1',
          amount: 25.5,
          category: 'Food',
          description: 'Lunch',
          vendor: 'Restaurant',
          date: '2024-01-15T00:00:00.000Z',
          createdAt: '2024-01-15T10:00:00.000Z',
          updatedAt: '2024-01-15T10:00:00.000Z',
        },
        {
          id: '2',
          amount: 50.0,
          category: 'Food',
          description: 'Groceries',
          vendor: 'Supermarket',
          date: '2024-01-10T00:00:00.000Z',
          createdAt: '2024-01-10T10:00:00.000Z',
          updatedAt: '2024-01-10T10:00:00.000Z',
        },
        {
          id: '3',
          amount: 15.0,
          category: 'Transportation',
          description: 'Bus',
          vendor: 'Transit',
          date: '2024-01-12T00:00:00.000Z',
          createdAt: '2024-01-12T10:00:00.000Z',
          updatedAt: '2024-01-12T10:00:00.000Z',
        },
      ];

      mockStorage.getExpenses.mockReturnValue(mockExpenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const summary = result.current.getSummary();

      expect(summary.totalExpenses).toBe(90.5);
      expect(summary.monthlyTotal).toBe(90.5); // All expenses are in January 2024
      expect(summary.categorySummary.Food).toBe(75.5);
      expect(summary.categorySummary.Transportation).toBe(15.0);
      expect(summary.topCategory?.category).toBe('Food');
      expect(summary.topCategory?.amount).toBe(75.5);
    });
  });

  describe('getVendorStats', () => {
    test('calculates vendor statistics correctly', () => {
      const mockExpenses: Expense[] = [
        {
          id: '1',
          amount: 25.5,
          category: 'Food',
          description: 'Lunch',
          vendor: 'Restaurant A',
          date: '2024-01-15T00:00:00.000Z',
          createdAt: '2024-01-15T10:00:00.000Z',
          updatedAt: '2024-01-15T10:00:00.000Z',
        },
        {
          id: '2',
          amount: 30.0,
          category: 'Food',
          description: 'Dinner',
          vendor: 'Restaurant A',
          date: '2024-01-10T00:00:00.000Z',
          createdAt: '2024-01-10T10:00:00.000Z',
          updatedAt: '2024-01-10T10:00:00.000Z',
        },
        {
          id: '3',
          amount: 15.0,
          category: 'Transportation',
          description: 'Bus',
          vendor: 'Transit',
          date: '2024-01-12T00:00:00.000Z',
          createdAt: '2024-01-12T10:00:00.000Z',
          updatedAt: '2024-01-12T10:00:00.000Z',
        },
      ];

      mockStorage.getExpenses.mockReturnValue(mockExpenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const vendorStats = result.current.getVendorStats();

      expect(vendorStats.totalVendors).toBe(2);
      expect(vendorStats.totalSpent).toBe(70.5);
      expect(vendorStats.topVendor?.vendor).toBe('Restaurant A');
      expect(vendorStats.topVendor?.totalAmount).toBe(55.5);
      expect(vendorStats.topVendor?.transactionCount).toBe(2);
      expect(vendorStats.topVendor?.averageAmount).toBe(27.75);
    });

    test('handles expenses without vendor', () => {
      const mockExpenses: Expense[] = [
        {
          id: '1',
          amount: 25.5,
          category: 'Food',
          description: 'Lunch',
          date: '2024-01-15T00:00:00.000Z',
          createdAt: '2024-01-15T10:00:00.000Z',
          updatedAt: '2024-01-15T10:00:00.000Z',
        },
      ];

      mockStorage.getExpenses.mockReturnValue(mockExpenses);
      
      const { result } = renderHook(() => useExpenses(), {
        wrapper: createWrapper,
      });

      const vendorStats = result.current.getVendorStats();

      expect(vendorStats.totalVendors).toBe(1);
      expect(vendorStats.topVendor?.vendor).toBe('Unknown');
    });
  });

  describe('Error Handling', () => {
    test('throws error when useExpenses is used outside ExpenseProvider', () => {
      // Mock console.error to avoid error output in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => useExpenses());
      }).toThrow('useExpenses must be used within an ExpenseProvider');

      consoleSpy.mockRestore();
    });
  });
});