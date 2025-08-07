import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseProvider } from '@/hooks/useExpenses';
import { LanguageProvider } from '@/hooks/useLanguage';

interface MockDatePickerProps {
  selected?: Date;
  onChange: (date: Date) => void;
  className?: string;
  dateFormat?: string;
  maxDate?: Date;
}

// Mock date picker to avoid issues with complex date picker rendering
jest.mock('react-datepicker', () => {
  return function MockDatePicker({ selected, onChange, className }: MockDatePickerProps) {
    return (
      <input
        id="date"
        data-testid="date-picker"
        type="date"
        className={className}
        value={selected?.toISOString().split('T')[0] || ''}
        onChange={(e) => onChange(new Date(e.target.value))}
      />
    );
  };
});

interface RenderExpenseFormProps {
  editingExpense?: {
    id: string;
    amount: number;
    category: 'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';
    description: string;
    vendor?: string;
    date: string;
  } | null;
  onClose?: () => void;
}

const renderExpenseForm = (props?: RenderExpenseFormProps) => {
  return render(
    <LanguageProvider>
      <ExpenseProvider>
        <ExpenseForm {...props} />
      </ExpenseProvider>
    </LanguageProvider>
  );
};

describe('ExpenseForm', () => {
  describe('Finnish Number Validation', () => {
    test('accepts valid Finnish number format with comma decimal separator', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const amountInput = screen.getByLabelText(/summa/i);
      const descriptionInput = screen.getByLabelText(/kuvaus/i);
      const vendorInput = screen.getByLabelText(/myyjä/i);
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });

      await user.type(amountInput, '15,50');
      await user.type(descriptionInput, 'Test expense');
      await user.type(vendorInput, 'Test vendor');
      
      await user.click(submitButton);

      // Should not show validation error for valid Finnish format
      expect(screen.queryByText(/please enter a valid amount/i)).not.toBeInTheDocument();
    });

    test('accepts whole numbers without decimal separator', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const amountInput = screen.getByLabelText(/summa/i);
      const descriptionInput = screen.getByLabelText(/kuvaus/i);
      const vendorInput = screen.getByLabelText(/myyjä/i);
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });

      await user.type(amountInput, '100');
      await user.type(descriptionInput, 'Test expense');
      await user.type(vendorInput, 'Test vendor');
      
      await user.click(submitButton);

      // Should not show validation error for whole numbers
      expect(screen.queryByText(/please enter a valid amount/i)).not.toBeInTheDocument();
    });

    test('rejects invalid format with dot decimal separator', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const amountInput = screen.getByLabelText(/summa/i);
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });

      await user.type(amountInput, '15.50');
      await user.click(submitButton);

      expect(await screen.findByText(/please enter a valid amount \(e\.g\., 15,50\)/i)).toBeInTheDocument();
    });

    test('rejects empty amount', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });
      await user.click(submitButton);

      expect(await screen.findByText(/please enter an amount/i)).toBeInTheDocument();
    });

    test('rejects zero or negative amounts', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const amountInput = screen.getByLabelText(/summa/i);
      const descriptionInput = screen.getByLabelText(/kuvaus/i);
      const vendorInput = screen.getByLabelText(/myyjä/i);
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });

      await user.type(amountInput, '0');
      await user.type(descriptionInput, 'Test expense');
      await user.type(vendorInput, 'Test vendor');
      await user.click(submitButton);

      expect(await screen.findByText(/amount must be greater than 0/i)).toBeInTheDocument();
    });

    test('rejects invalid formats with multiple commas', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const amountInput = screen.getByLabelText(/summa/i);
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });

      await user.type(amountInput, '15,50,25');
      await user.click(submitButton);

      expect(await screen.findByText(/please enter a valid amount \(e\.g\., 15,50\)/i)).toBeInTheDocument();
    });

    test('clears validation error when user starts typing valid input', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const amountInput = screen.getByLabelText(/summa/i);
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });

      // First enter invalid amount
      await user.type(amountInput, '15.50');
      await user.click(submitButton);
      
      expect(await screen.findByText(/please enter a valid amount/i)).toBeInTheDocument();

      // Clear and enter valid amount
      await user.clear(amountInput);
      await user.type(amountInput, '15,50');

      // Error should be cleared
      await waitFor(() => {
        expect(screen.queryByText(/please enter a valid amount/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    test('requires description', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });
      await user.click(submitButton);

      expect(await screen.findByText(/please enter a description/i)).toBeInTheDocument();
    });

    test('requires vendor/payee', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });
      await user.click(submitButton);

      expect(await screen.findByText(/please enter a vendor\/payee/i)).toBeInTheDocument();
    });

    test('allows category selection', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const categorySelect = screen.getByLabelText(/kategoria/i);
      
      expect(categorySelect).toBeInTheDocument();
      expect(screen.getByDisplayValue('Food')).toBeInTheDocument();
      
      await user.selectOptions(categorySelect, 'Transportation');
      expect(screen.getByDisplayValue('Transportation')).toBeInTheDocument();
    });
  });

  describe('Edit Mode', () => {
    const editingExpense = {
      id: '1',
      amount: 25.5,
      category: 'Transportation' as const,
      description: 'Bus ticket',
      vendor: 'City Transport',
      date: '2024-01-15T00:00:00.000Z'
    };

    test('populates form with existing expense data in Finnish format', () => {
      renderExpenseForm({ editingExpense });
      
      expect(screen.getByDisplayValue('25,5')).toBeInTheDocument(); // Finnish format
      expect(screen.getByDisplayValue('Transportation')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Bus ticket')).toBeInTheDocument();
      expect(screen.getByDisplayValue('City Transport')).toBeInTheDocument();
    });

    test('shows "Edit Expense" title in edit mode', () => {
      renderExpenseForm({ editingExpense });
      
      expect(screen.getByRole('heading', { name: /muokkaa kulut/i })).toBeInTheDocument();
    });

    test('shows "Update Expense" button text in edit mode', () => {
      renderExpenseForm({ editingExpense });
      
      expect(screen.getByRole('button', { name: /tallenna/i })).toBeInTheDocument();
    });
  });

  describe('Form Reset', () => {
    test('resets form after successful submission', async () => {
      const user = userEvent.setup();
      renderExpenseForm();
      
      const amountInput = screen.getByLabelText(/summa/i);
      const descriptionInput = screen.getByLabelText(/kuvaus/i);
      const vendorInput = screen.getByLabelText(/myyjä/i);
      const categorySelect = screen.getByLabelText(/kategoria/i);
      const submitButton = screen.getByRole('button', { name: /lisää kulut/i });

      await user.type(amountInput, '15,50');
      await user.type(descriptionInput, 'Test expense');
      await user.type(vendorInput, 'Test vendor');
      await user.selectOptions(categorySelect, 'Transportation');
      
      await user.click(submitButton);

      // Form should reset after successful submission
      await waitFor(() => {
        expect(amountInput).toHaveValue('');
        expect(descriptionInput).toHaveValue('');
        expect(vendorInput).toHaveValue('');
        expect(categorySelect).toHaveValue('Food'); // Default category
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper form labels', () => {
      renderExpenseForm();
      
      expect(screen.getByLabelText(/summa/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/kategoria/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/kuvaus/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/myyjä/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/päivämäärä/i)).toBeInTheDocument();
    });

    test('shows placeholder for amount input with Finnish format example', () => {
      renderExpenseForm();
      
      const amountInput = screen.getByLabelText(/summa/i);
      expect(amountInput).toHaveAttribute('placeholder', '15,50');
    });

    test('has proper input modes for numeric input', () => {
      renderExpenseForm();
      
      const amountInput = screen.getByLabelText(/summa/i);
      expect(amountInput).toHaveAttribute('inputMode', 'decimal');
    });
  });
});