export type ExpenseCategory = 
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  vendor?: string; // Vendor/payee name (optional for backward compatibility)
  date: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ExpenseFormData {
  amount: string;
  category: ExpenseCategory;
  description: string;
  vendor?: string;
  date: Date;
}

export interface ExpenseFilters {
  category?: ExpenseCategory | 'All';
  vendor?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

export interface ExpenseSummary {
  totalExpenses: number;
  monthlyTotal: number;
  categorySummary: Record<ExpenseCategory, number>;
  topCategory: {
    category: ExpenseCategory;
    amount: number;
  } | null;
}

export interface VendorSummary {
  vendor: string;
  totalAmount: number;
  transactionCount: number;
  averageAmount: number;
  categories: Record<ExpenseCategory, number>;
  lastTransactionDate: string;
}

export interface VendorStats {
  totalVendors: number;
  topVendor: VendorSummary | null;
  vendorSummaries: VendorSummary[];
  totalSpent: number;
}

export interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  getFilteredExpenses: (filters: ExpenseFilters) => Expense[];
  getSummary: () => ExpenseSummary;
  getVendorStats: () => VendorStats;
}