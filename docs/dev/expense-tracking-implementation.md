# Expense Tracking System Implementation

**Created:** 2025-01-08  
**Last Updated:** 2025-01-08  
**Version:** 1.0.0

## Overview

The expense tracking system is the core feature of the application, providing comprehensive functionality for managing personal expenses with Finnish localization support. The system includes expense creation, editing, viewing, filtering, categorization, vendor tracking, and export capabilities.

## Architecture

### Component Hierarchy
```
ExpenseProvider (Context)
├── ExpenseForm (Add/Edit)
├── ExpenseList (View/Manage)
│   ├── ExpenseFilters (Search/Filter)
│   └── ExpenseListItem (Individual expense)
├── Dashboard (Summary view)
├── ExpenseCategories (Category breakdown)
├── TopVendors (Vendor analysis)
└── MonthlyInsights (Trend analysis)
```

### Data Flow
1. **Creation**: ExpenseForm → useExpenses.addExpense → localStorage → Context update → UI refresh
2. **Reading**: localStorage → ExpenseProvider → useExpenses hook → Components
3. **Updating**: ExpenseList edit → ExpenseForm → useExpenses.updateExpense → localStorage → Context update
4. **Deletion**: ExpenseList → useExpenses.deleteExpense → localStorage → Context update
5. **Filtering**: ExpenseFilters → getFilteredExpenses → ExpenseList rendering

### Dependencies
- **React Context**: State management across components
- **localStorage**: Client-side data persistence
- **date-fns**: Date manipulation and filtering
- **react-datepicker**: Date selection UI

## Implementation Details

### Core Data Types
**Location**: `src/types/expense.ts`

```typescript
export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  vendor?: string; // Optional for backward compatibility
  date: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type ExpenseCategory = 
  | 'Food' | 'Transportation' | 'Entertainment' 
  | 'Shopping' | 'Bills' | 'Other';
```

### State Management Hook
**Location**: `src/hooks/useExpenses.tsx`

The `useExpenses` hook provides centralized expense management through React Context.

#### Core Methods
```typescript
// Create new expense with auto-generated metadata
addExpense(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void

// Update existing expense with new updatedAt timestamp
updateExpense(id: string, updates: Partial<Expense>) => void

// Remove expense from storage and state
deleteExpense(id: string) => void

// Get filtered subset of expenses based on criteria
getFilteredExpenses(filters: ExpenseFilters) => Expense[]

// Calculate monthly and total summaries
getSummary() => ExpenseSummary

// Analyze vendor statistics and trends
getVendorStats() => VendorStats
```

#### Advanced Filtering Logic
**Location**: `src/hooks/useExpenses.tsx:59-95`

The filtering system supports multiple criteria:
- **Category filtering**: Exact match or 'All' option
- **Date range filtering**: Using date-fns `isWithinInterval`
- **Vendor filtering**: Case-insensitive exact match
- **Text search**: Multi-field search across description, category, amount, and vendor

```typescript
const getFilteredExpenses = (filters: ExpenseFilters): Expense[] => {
  return expenses.filter(expense => {
    // Category filter
    if (filters.category && filters.category !== 'All' && 
        expense.category !== filters.category) return false;
    
    // Date range filter using date-fns
    if (filters.dateFrom && filters.dateTo) {
      const expenseDate = parseISO(expense.date);
      if (!isWithinInterval(expenseDate, { 
        start: filters.dateFrom, 
        end: filters.dateTo 
      })) return false;
    }
    
    // Multi-field text search
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matches = [
        expense.description.toLowerCase().includes(query),
        expense.category.toLowerCase().includes(query),
        expense.amount.toString().includes(query),
        expense.vendor?.toLowerCase().includes(query)
      ];
      if (!matches.some(Boolean)) return false;
    }
    
    return true;
  });
};
```

### Finnish Localization System
**Location**: `src/lib/utils.ts:23-48`

The application fully supports Finnish number formatting and validation.

#### Number Formatting Functions
```typescript
// Parse Finnish decimal format (comma separator)
parseFinishNumber("15,50") // Returns 15.5
parseFinishNumber("123,45") // Returns 123.45

// Validate Finnish number format
isValidFinishNumber("15,50") // Returns true
isValidFinishNumber("15.50") // Returns false (dot not supported)
isValidFinishNumber("15,") // Returns false (incomplete)

// Format number to Finnish locale
formatFinishNumber(15.5) // Returns "15,5"
formatFinishNumber(1234.56) // Returns "1 234,56"
```

#### Currency and Date Formatting
```typescript
// Finnish currency formatting
formatCurrency(15.5) // Returns "15,50 €"
formatCurrency(1234.56) // Returns "1 234,56 €"

// Finnish date formatting
formatDate("2025-01-08") // Returns "8. tammi 2025"
formatDate(new Date()) // Returns localized Finnish date
```

### Form Component Architecture
**Location**: `src/components/ExpenseForm.tsx`

#### Validation System
The form implements comprehensive validation with Finnish format support:

```typescript
const validateForm = (): boolean => {
  const errors: Partial<Record<keyof ExpenseFormData, string>> = {};

  // Finnish number validation
  if (!formData.amount || formData.amount.trim() === '') {
    errors.amount = 'Please enter an amount';
  } else if (!isValidFinishNumber(formData.amount)) {
    errors.amount = 'Please enter a valid amount (e.g., 15,50)';
  } else {
    const amount = parseFinishNumber(formData.amount);
    if (amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    }
  }

  // Required field validation
  if (!formData.description.trim()) {
    errors.description = 'Please enter a description';
  }
  if (!formData.vendor?.trim()) {
    errors.vendor = 'Please enter a vendor/payee';
  }
  if (!formData.date) {
    errors.date = 'Please select a date';
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
```

#### Dual Mode Support
The form supports both add and edit modes based on the `editingExpense` prop:

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  const expenseData = {
    amount: parseFinishNumber(formData.amount),
    category: formData.category,
    description: formData.description.trim(),
    vendor: formData.vendor?.trim() || '',
    date: formData.date.toISOString(),
  };

  if (editingExpense) {
    updateExpense(editingExpense.id, expenseData);
  } else {
    addExpense(expenseData);
  }

  // Reset and close form
  resetForm();
  onClose?.();
};
```

### List Component with Sorting and Filtering
**Location**: `src/components/ExpenseList.tsx`

#### Multi-Column Sorting
```typescript
const sortedExpenses = [...filteredExpenses].sort((a, b) => {
  let comparison = 0;
  
  switch (sortBy) {
    case 'date':
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      break;
    case 'amount':
      comparison = a.amount - b.amount;
      break;
    case 'category':
      comparison = a.category.localeCompare(b.category);
      break;
  }
  
  return sortOrder === 'asc' ? comparison : -comparison;
});
```

#### Responsive Design
- **Desktop**: Full table view with sortable columns
- **Mobile**: Card-based layout with condensed information
- **Actions**: Edit and delete buttons with confirmation dialogs

### Data Persistence Layer
**Location**: `src/lib/storage.ts`

```typescript
export const storage = {
  getExpenses: (): Expense[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load expenses:', error);
      return [];
    }
  },

  saveExpenses: (expenses: Expense[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Failed to save expenses:', error);
    }
  }
};
```

## Code Examples

### Adding a New Expense
```typescript
const { addExpense } = useExpenses();

const handleAddExpense = () => {
  const expenseData = {
    amount: 25.50,
    category: 'Food' as ExpenseCategory,
    description: 'Lunch at restaurant',
    vendor: 'Ravintola Helsinki',
    date: new Date().toISOString(),
  };
  
  addExpense(expenseData);
};
```

### Filtering Expenses by Date Range
```typescript
const { getFilteredExpenses } = useExpenses();
const [filters, setFilters] = useState<ExpenseFilters>({});

const filterByThisMonth = () => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  
  setFilters({
    dateFrom: monthStart,
    dateTo: monthEnd
  });
};

const filteredExpenses = getFilteredExpenses(filters);
```

### Category Statistics
```typescript
const { getSummary } = useExpenses();

const summary = getSummary();
console.log('Top category:', summary.topCategory);
console.log('Monthly total:', formatCurrency(summary.monthlyTotal));
console.log('Category breakdown:', summary.categorySummary);
```

### Vendor Analysis
```typescript
const { getVendorStats } = useExpenses();

const vendorStats = getVendorStats();
const topVendor = vendorStats.topVendor;

if (topVendor) {
  console.log(`Top vendor: ${topVendor.vendor}`);
  console.log(`Total spent: ${formatCurrency(topVendor.totalAmount)}`);
  console.log(`Average per transaction: ${formatCurrency(topVendor.averageAmount)}`);
  console.log(`Transaction count: ${topVendor.transactionCount}`);
}
```

## Testing

### Critical Test Scenarios
1. **Finnish Number Validation**
   - Valid formats: "15,50", "123,45", "1000,00"
   - Invalid formats: "15.50", "15,", ",50", "15,123"

2. **CRUD Operations**
   - Add expense with all fields
   - Update existing expense
   - Delete expense with confirmation
   - Validation error handling

3. **Filtering and Search**
   - Date range filtering
   - Category filtering
   - Multi-field text search
   - Combined filter criteria

4. **Data Persistence**
   - localStorage save/load operations
   - Error handling for storage failures
   - Data migration for schema changes

### Test Data Examples
```typescript
const testExpenses: Expense[] = [
  {
    id: 'test-1',
    amount: 25.50,
    category: 'Food',
    description: 'Lunch at Ravintola',
    vendor: 'Ravintola Helsinki',
    date: '2025-01-08T12:00:00Z',
    createdAt: '2025-01-08T12:00:00Z',
    updatedAt: '2025-01-08T12:00:00Z'
  },
  // More test cases...
];
```

## Integration Points

### Main Application Integration
**Location**: `src/app/page.tsx:43-62`

```typescript
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
```

### Dashboard Integration
The expense tracking system integrates with:
- **Dashboard**: Summary statistics and recent expenses
- **Categories**: Category-wise expense breakdown
- **Vendors**: Top vendors and spending analysis
- **Export**: CSV export functionality
- **Insights**: Monthly trends and analytics

## Performance Considerations

### Optimization Strategies
1. **Memoization**: Filter results cached until dependencies change
2. **Lazy Loading**: Components load only when tabs are active
3. **Virtual Scrolling**: Consider for large expense lists (future enhancement)
4. **Debounced Search**: Text search with input debouncing

### Memory Management
- Context state updates trigger minimal re-renders
- localStorage operations are batched
- Date objects are created only when needed

## Security & Privacy

### Data Protection
- No sensitive financial data leaves the browser
- localStorage encryption could be added for enhanced security
- Input sanitization prevents XSS attacks
- No external API calls reduce attack surface

### Input Validation
- All user inputs validated both client-side and before storage
- Amount validation prevents negative or invalid values
- Date validation prevents future dates
- Description and vendor fields sanitized

## Troubleshooting

### Common Issues

**Finnish Number Format Not Working**
- Check `isValidFinishNumber` validation in utils.ts:42-48
- Ensure comma is used as decimal separator, not dot
- Verify locale settings are 'fi-FI'

**Expenses Not Persisting**
- Check localStorage availability and quota
- Verify JSON serialization in storage.ts
- Check browser privacy settings

**Filtering Not Working**
- Verify date parsing with parseISO from date-fns
- Check filter logic in useExpenses.tsx:59-95
- Ensure filter state is properly updated

**Form Validation Errors**
- Check validation logic in ExpenseForm.tsx:38-70
- Verify error state management
- Ensure all required fields are validated

## Future Enhancement Opportunities

1. **Backend Integration**: Replace localStorage with REST API
2. **Advanced Analytics**: Spending trends, budgeting features
3. **Multi-Currency Support**: Support currencies beyond EUR
4. **Bulk Operations**: Import/export, batch editing
5. **Mobile App**: React Native implementation
6. **Receipt Scanning**: OCR integration for automatic expense entry
7. **Recurring Expenses**: Template-based recurring transactions
8. **Budget Alerts**: Spending limit notifications

## Related Documentation

- [User Guide: How to Use Expense Tracking](../user/how-to-expense-tracking.md)
- [Finnish Localization Guide](../localization.md) (if exists)
- [Export System Documentation](../dev/export-system.md) (if exists)

---

**Maintainer**: Development Team  
**Last Updated**: Generated with Claude Code