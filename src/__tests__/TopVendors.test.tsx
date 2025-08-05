import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopVendors } from '@/components/TopVendors';
import { ExpenseProvider } from '@/hooks/useExpenses';
import { ThemeProvider } from '@/hooks/useTheme';

// Mock recharts components
jest.mock('recharts', () => ({
  BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  PieChart: ({ children }: { children: React.ReactNode }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
}));

// Mock storage
jest.mock('@/lib/storage', () => ({
  storage: {
    getExpenses: jest.fn(() => [
      {
        id: '1',
        amount: 25.50,
        category: 'Food',
        description: 'Lunch',
        vendor: 'Cafe Central',
        date: '2023-12-25T00:00:00.000Z',
        createdAt: '2023-12-25T00:00:00.000Z',
        updatedAt: '2023-12-25T00:00:00.000Z',
      },
      {
        id: '2',
        amount: 30.00,
        category: 'Food',
        description: 'Dinner',
        vendor: 'Cafe Central',
        date: '2023-12-26T00:00:00.000Z',
        createdAt: '2023-12-26T00:00:00.000Z',
        updatedAt: '2023-12-26T00:00:00.000Z',
      },
      {
        id: '3',
        amount: 15.00,
        category: 'Transportation',
        description: 'Bus ticket',
        vendor: 'Public Transit',
        date: '2023-12-25T00:00:00.000Z',
        createdAt: '2023-12-25T00:00:00.000Z',
        updatedAt: '2023-12-25T00:00:00.000Z',
      },
    ]),
    saveExpenses: jest.fn(),
    clearExpenses: jest.fn(),
  },
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <ExpenseProvider>
      {children}
    </ExpenseProvider>
  </ThemeProvider>
);

describe('TopVendors Component', () => {
  test('renders vendor statistics correctly', () => {
    render(<TopVendors />, { wrapper: Wrapper });

    expect(screen.getByText('Top Vendors')).toBeInTheDocument();
    expect(screen.getByText('Total Vendors')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Total vendors count
    expect(screen.getByText('Total Spent')).toBeInTheDocument();
    expect(screen.getByText('70,50 €')).toBeInTheDocument(); // Total spent
    expect(screen.getByText('Top Vendor')).toBeInTheDocument();
    expect(screen.getByText('Cafe Central')).toBeInTheDocument(); // Top vendor name
  });

  test('displays vendor list correctly', () => {
    render(<TopVendors />, { wrapper: Wrapper });

    expect(screen.getByText('All Vendors')).toBeInTheDocument();
    expect(screen.getByText('Cafe Central')).toBeInTheDocument();
    expect(screen.getByText('Public Transit')).toBeInTheDocument();
    expect(screen.getByText('55,50 €')).toBeInTheDocument(); // Cafe Central total
    expect(screen.getByText('15,00 €')).toBeInTheDocument(); // Public Transit total
  });

  test('switches between card and table view', () => {
    render(<TopVendors />, { wrapper: Wrapper });

    // Initially in card view
    expect(screen.getByText('Table View')).toBeInTheDocument();

    // Switch to table view
    fireEvent.click(screen.getByText('Table View'));
    expect(screen.getByText('Card View')).toBeInTheDocument();
    expect(screen.getByText('Vendor')).toBeInTheDocument(); // Table header
    expect(screen.getByText('Total Amount')).toBeInTheDocument(); // Table header
    expect(screen.getByText('Transactions')).toBeInTheDocument(); // Table header
  });

  test('opens vendor detail modal when clicking on vendor card', () => {
    render(<TopVendors />, { wrapper: Wrapper });

    // Click on a vendor card
    const vendorCards = screen.getAllByText('Cafe Central');
    fireEvent.click(vendorCards[1]); // Click on the vendor card (not the stat card)

    // Check if modal opened (modal content should be visible)
    expect(screen.getAllByText('Cafe Central')).toHaveLength(3); // Title, stat card, and modal title
    expect(screen.getByText('Total Spent')).toBeInTheDocument();
    expect(screen.getByText('Category Breakdown')).toBeInTheDocument();
  });

  test('renders charts when data is available', () => {
    render(<TopVendors />, { wrapper: Wrapper });

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByText('Top 10 Vendors by Spending')).toBeInTheDocument();
  });

  test('shows empty state when no vendors exist', () => {
    // Mock empty expenses
    jest.doMock('@/lib/storage', () => ({
      storage: {
        getExpenses: jest.fn(() => []),
        saveExpenses: jest.fn(),
        clearExpenses: jest.fn(),
      },
    }));

    render(<TopVendors />, { wrapper: Wrapper });

    expect(screen.getByText('No vendors yet')).toBeInTheDocument();
    expect(screen.getByText('Start adding expenses with vendor information to see vendor analytics here.')).toBeInTheDocument();
  });
});