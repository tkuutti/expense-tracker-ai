# Add Expense - Developer Implementation Guide

## Overview

The "Add expense" feature is a comprehensive form-based system that enables users to create and edit expense entries with Finnish localization support. This document provides technical details for developers working with this feature.

## Architecture

### Component Hierarchy
```
ExpenseForm
├── Form validation logic
├── Finnish number formatting
├── Date picker integration
└── State management via useExpenses hook
```

### Data Flow
1. User input → Form validation → State update → Local storage → UI refresh
2. Edit mode: Existing expense data → Form population → Validation → Update operation

## Core Components

### ExpenseForm Component
**Location**: `src/components/ExpenseForm.tsx`

The main UI component handling both add and edit operations for expenses.

#### Key Props
```typescript
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
```

#### State Management
- **Form Data**: Uses `ExpenseFormData` interface with controlled inputs
- **Validation**: Real-time validation with error state management
- **Mode Detection**: Automatically detects add vs. edit mode based on `editingExpense` prop

### useExpenses Hook
**Location**: `src/hooks/useExpenses.tsx`

Provides expense management functionality through React Context.

#### Key Methods
```typescript
// Add new expense
addExpense(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void

// Update existing expense  
updateExpense(id: string, expense: Partial<Expense>) => void

// Delete expense
deleteExpense(id: string) => void
```

### Type Definitions
**Location**: `src/types/expense.ts`

#### Core Types
```typescript
export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  amount: string; // Finnish format (comma decimal)
  category: ExpenseCategory;
  description: string;
  date: Date;
}
```

## Key Implementation Details

### Finnish Number Formatting
**Location**: `src/lib/utils.ts:24-48`

The application supports Finnish number format with comma as decimal separator.

```typescript
// Parse Finnish format to number
parseFinishNumber("15,50") // Returns 15.5

// Validate Finnish format
isValidFinishNumber("15,50") // Returns true
isValidFinishNumber("15.50") // Returns false

// Format number to Finnish format
formatFinishNumber(15.5) // Returns "15,5"
```

### Form Validation Logic
**Location**: `src/components/ExpenseForm.tsx:36-63`

#### Validation Rules
- **Amount**: Required, must be valid Finnish number format, must be > 0
- **Description**: Required, cannot be empty string
- **Date**: Required, cannot be null, limited to current date or earlier
- **Category**: Required, must be one of predefined categories

#### Real-time Validation
- Errors clear when user starts typing in a field
- Full validation runs on form submission
- Individual field validation on blur/change events

### Category System
**Location**: `src/components/ExpenseForm.tsx:22`

```typescript
const CATEGORIES: ExpenseCategory[] = [
  'Food', 'Transportation', 'Entertainment', 
  'Shopping', 'Bills', 'Other'
];
```

### Data Persistence
**Location**: `src/lib/storage.ts`

Uses localStorage for client-side persistence:
- **Storage Key**: `'expense-tracker-data'`
- **Format**: JSON array of Expense objects
- **Error Handling**: Graceful fallback for localStorage issues

## Integration Points

### Main Application
**Location**: `src/app/page.tsx:37-51`

The ExpenseForm is integrated into the main application through a tab-based interface:

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
          date: editingExpense.date,
        } : null}
      />
    </div>
  );
```

### Edit Mode Activation
Edit mode is triggered from the expense list component, which passes the selected expense to the form.

## Dependencies

### External Libraries
- **react-datepicker** (`^8.4.0`): Date selection with Finnish formatting
- **date-fns** (`^4.1.0`): Date manipulation and formatting
- **lucide-react** (`^0.536.0`): Icons (Plus icon for submit button)

### Internal Dependencies
- **useExpenses**: Context hook for expense management
- **Finnish formatting utilities**: Number parsing and validation
- **Storage utilities**: localStorage abstraction

## Code Examples

### Adding a New Expense
```typescript
const { addExpense } = useExpenses();

const handleSubmit = (formData: ExpenseFormData) => {
  const expenseData = {
    amount: parseFinishNumber(formData.amount),
    category: formData.category,
    description: formData.description.trim(),
    date: formData.date.toISOString(),
  };
  
  addExpense(expenseData);
};
```

### Form Field Validation
```typescript
const validateAmount = (amount: string): string | undefined => {
  if (!amount || amount.trim() === '') {
    return 'Please enter an amount';
  }
  if (!isValidFinishNumber(amount)) {
    return 'Please enter a valid amount (e.g., 15,50)';
  }
  const numericAmount = parseFinishNumber(amount);
  if (numericAmount <= 0) {
    return 'Amount must be greater than 0';
  }
  return undefined;
};
```

## Testing Considerations

### Critical Test Cases
1. **Finnish Number Format**: Test comma vs. dot decimal separators
2. **Form Validation**: Test all validation rules and error states
3. **Add vs. Edit Mode**: Ensure proper behavior in both modes
4. **Date Boundaries**: Test date picker limits and formatting
5. **Storage Integration**: Test localStorage save/load operations
6. **Error Handling**: Test localStorage failure scenarios

### Edge Cases
- Empty form submission
- Invalid Finnish number formats ("15.50", "15,", ",50")
- Future date selection (should be prevented)
- Long description strings
- Category selection persistence

## Performance Notes

- Form state is local to the component for optimal performance
- Validation runs only when necessary (on submit + real-time for active fields)
- LocalStorage operations are synchronous but wrapped in try-catch
- Date picker renders only when needed

## Security Considerations

- All user inputs are validated before processing
- XSS prevention through React's built-in escaping
- No sensitive data stored in localStorage
- Input sanitization for description field

## Future Enhancement Opportunities

1. **Backend Integration**: Replace localStorage with API calls
2. **Advanced Validation**: Custom category validation, recurring expenses
3. **Bulk Operations**: Multiple expense entry, CSV import
4. **Accessibility**: Enhanced keyboard navigation, screen reader support
5. **Internationalization**: Support for other locales beyond Finnish

## Related Documentation

- [User Guide: How to Add Expense](../user/how-to-add-expense.md)
- [Component Library](../components.md) (if exists)
- [API Documentation](../api.md) (if exists)

---

**Last Updated**: Generated with Claude Code  
**Maintainer**: Development Team