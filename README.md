# Expense Tracker AI

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. This application helps users manage their personal finances with an intuitive interface, comprehensive features, Euro currency support, Finnish localization, and dark mode functionality.

## Features

### 📊 Dashboard
- **Summary Cards**: View total expenses, monthly spending, top category, and active categories
- **Visual Analytics**: Interactive pie and bar charts showing spending patterns
- **Category Breakdown**: Detailed breakdown of expenses by category with percentages

### 💰 Expense Management
- **Add Expenses**: Easy-to-use form with date picker, category selection, and validation
- **Edit Expenses**: Modify existing expenses with pre-filled forms
- **Delete Expenses**: Remove unwanted expenses with confirmation
- **Form Validation**: Comprehensive client-side validation for all inputs

### 🔍 Advanced Filtering & Search
- **Text Search**: Search through expense descriptions, categories, and amounts
- **Category Filter**: Filter expenses by specific categories or view all
- **Date Range Filter**: Filter expenses by custom date ranges
- **Real-time Filtering**: Instant results as you type or change filters

### 📱 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes with automatic system preference detection
- **Professional Theme**: Clean, modern interface with intuitive navigation
- **Loading States**: Visual feedback for all user actions
- **Mobile-Optimized**: Specialized mobile layouts for expense lists and forms
- **Theme Persistence**: Remembers your preferred theme setting

### 📈 Analytics & Insights
- **Category Analytics**: Visual representation of spending by category
- **Monthly Tracking**: Current month spending summaries
- **Top Category Detection**: Automatically identifies highest spending category
- **Spending Trends**: Visual charts showing expense patterns

### 💾 Data Management
- **LocalStorage Persistence**: All data saved locally in browser
- **CSV Export**: Export expenses to CSV for external analysis
- **Data Validation**: Ensures data integrity across all operations
- **Euro Currency**: Full support for Euro (€) currency with Finnish formatting
- **Finnish Localization**: Date formats and number formatting optimized for Finnish users

## Technology Stack

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns, react-datepicker
- **State Management**: React Context + Hooks

## Supported Categories

- 🍔 Food
- 🚗 Transportation
- 🎬 Entertainment
- 🛍️ Shopping
- 💡 Bills
- 📦 Other

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## How to Use

### 1. Adding Your First Expense
1. Click on the **"Add Expense"** tab in the navigation
2. Fill in the expense details:
   - **Amount**: Enter the expense amount in Euros (e.g., 25,99€)
   - **Category**: Select from the dropdown (Food, Transportation, etc.)
   - **Description**: Describe the expense (e.g., "Lunch at restaurant")
   - **Date**: Choose the expense date using the date picker (Finnish dd.MM.yyyy format)
3. Click **"Add Expense"** to save

### 2. Viewing Your Expenses
1. Click on the **"Expenses"** tab to see all your expenses
2. Use the search bar to find specific expenses
3. Filter by category using the dropdown
4. Set date ranges to view expenses from specific periods
5. Click the sort arrows on column headers to sort by date, amount, or category

### 3. Managing Expenses
- **Edit**: Click the ✏️ icon next to any expense to modify it
- **Delete**: Click the 🗑️ icon to remove an expense (with confirmation)
- **Export**: Click "Export CSV" to download your expenses as a spreadsheet

### 4. Analyzing Your Spending
1. Go to the **"Dashboard"** tab to see:
   - Total amount spent across all time (in Euros)
   - Current month's spending
   - Your top spending category
   - Visual charts showing spending patterns
   - Category-wise breakdown with percentages

### 5. Using Dark Mode
1. Click the **theme toggle button** (🌙/☀️) in the top navigation
2. The app will switch between light and dark modes
3. Your preference is automatically saved and remembered
4. The app respects your system's dark mode preference by default

## Testing Features

### Test the Application
1. **Add Sample Expenses**: Create expenses in different categories with various amounts in Euros
2. **Test Filtering**: Use search, category filters, and date ranges
3. **Test Sorting**: Click column headers to sort expenses
4. **Test Charts**: Verify pie chart and bar chart display correctly with Euro amounts
5. **Test Export**: Export data and verify CSV format with Finnish formatting
6. **Test Responsive Design**: Resize browser or use mobile device
7. **Test Edit/Delete**: Modify and remove expenses
8. **Test Validation**: Try submitting forms with invalid data
9. **Test Dark Mode**: Toggle between light and dark themes
10. **Test Theme Persistence**: Refresh page and verify theme is remembered

### Sample Data to Add
Try adding these sample expenses to test all features:

- **Food**: "Grocery shopping" - 85,50€ - Today
- **Transportation**: "Gas for car" - 45,00€ - Yesterday  
- **Entertainment**: "Movie tickets" - 25,00€ - Last week
- **Shopping**: "New shirt" - 39,99€ - Last week
- **Bills**: "Electric bill" - 120,00€ - This month
- **Other**: "Gift for friend" - 30,00€ - Last month

## Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── globals.css    # Global styles and theme
│   ├── layout.tsx     # Root layout component
│   └── page.tsx       # Main application page
├── components/        # React components
│   ├── Dashboard.tsx      # Analytics and summary dashboard
│   ├── ExpenseForm.tsx    # Add/edit expense form
│   ├── ExpenseList.tsx    # Expense list with sorting
│   ├── ExpenseFilters.tsx # Search and filter controls
│   ├── ExportButton.tsx   # CSV export functionality
│   ├── Navigation.tsx     # Main navigation component
│   └── index.ts          # Component exports
├── hooks/             # Custom React hooks
│   ├── useExpenses.tsx    # Expense state management
│   └── useTheme.tsx       # Dark mode theme management
├── lib/               # Utility libraries
│   ├── storage.ts         # localStorage utilities
│   ├── utils.ts          # Helper functions
│   └── index.ts          # Library exports
└── types/             # TypeScript type definitions
    ├── expense.ts         # Expense-related types
    └── index.ts          # Type exports
```

## Data Storage

The application uses **localStorage** for data persistence, which means:
- ✅ **No server required** - works entirely in the browser
- ✅ **Fast performance** - instant data access
- ✅ **Privacy-focused** - data never leaves your device
- ✅ **Theme persistence** - remembers your dark/light mode preference
- ⚠️ **Browser-specific** - data is tied to the specific browser/device
- ⚠️ **No cloud sync** - data won't sync across devices

## Currency & Localization

- **Currency**: Euro (€) with Finnish formatting
- **Date Format**: Finnish standard (dd.MM.yyyy)
- **Number Format**: Finnish decimal notation (comma as decimal separator)
- **Amounts**: Displayed as "25,99 €" following Finnish conventions

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Contributing

This is a demo application. Feel free to:
- Fork the project and make improvements
- Add new features like budget tracking or recurring expenses
- Enhance the UI/UX design
- Add data export in other formats
- Implement cloud storage options

## License

This project is open source and available under the MIT License.
