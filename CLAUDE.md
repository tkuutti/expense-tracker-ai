# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Behavioral Guidelines

### Before Coding - YOU MUST
- **Ask clarifying questions** about requirements and approach
- **Read relevant files first** but don't code yet
- **Create a plan** and confirm approach for complex work
- **Use "think"** for complex problems requiring extended reasoning

### Implementation Rules - CRITICAL
- **NEVER** create placeholder or mock implementations
- **ALWAYS** use existing Finnish utility functions (`parseFinishNumber`, `formatFinishNumber`)
- **MUST** follow existing Context Provider patterns
- **AVOID** introducing new state management libraries
- **PREFER** small, testable functions over classes

### Communication Style
- Explain your approach before implementing
- Use subagents to verify details on complex problems
- Course correct early - stop and ask if uncertain
- Commit frequently after each significant change

## Development Commands

### Core Development
- `npm run dev` - Start development server on localhost:3000 with hostname 0.0.0.0
- `npm run build` - Build production application
- `npm run lint` - Run ESLint with Next.js configuration
- `npm start` - Start production server

### Testing
- `npm test` - Run all Jest tests
- `npm test:watch` - Run tests in watch mode
- `npm test -- --testNamePattern="specific test"` - Run specific test by name
- `npm test -- src/__tests__/utils.test.ts` - Run specific test file

## Tech Stack Declaration

**Next.js 15 App Router** application with:
- React 18.2, TypeScript 5.3
- Tailwind CSS for styling
- Jest + React Testing Library for testing
- date-fns, react-datepicker, recharts, lucide-react
- No backend - entirely client-side with localStorage

## Architecture Overview

### Core Architecture
Client-side expense tracking with **Finnish localization**. Architecture centers around Context Provider pattern with localStorage persistence.

### State Management
- `ExpenseProvider` (useExpenses hook) - Central expense state via React Context
- `ThemeProvider` (useTheme hook) - Dark/light theme with localStorage persistence
- **NO external state libraries** - pure React Context only

### Data Persistence
- **LocalStorage-based** via `src/lib/storage.ts`
- **No backend/database** - entirely client-side
- Automatic serialization/deserialization with error handling

### Finnish Localization System
- **Currency**: Euro (€) with `Intl.NumberFormat('fi-FI')`
- **Numbers**: Comma decimal separator (25,50 not 25.50)
- **Dates**: Finnish format (dd.MM.yyyy) via `Intl.DateTimeFormat('fi-FI')`
- **Critical utilities** in `src/lib/utils.ts`: `parseFinishNumber`, `formatFinishNumber`, `isValidFinishNumber`

## Development Workflow

### When Adding Expense Features - FOLLOW THIS SEQUENCE
1. **Update** `src/types/expense.ts` first
2. **Extend** ExpenseProvider methods in `src/hooks/useExpenses.tsx`
3. **Add** UI components using Finnish validation pattern
4. **Ensure** localStorage compatibility and data migration
5. **Add** tests covering Finnish number scenarios

### Finnish Validation Pattern - ALWAYS USE
```typescript
const amount = formData.amount;
if (!isValidFinishNumber(amount)) {
  setError('Please enter valid amount (e.g., 15,50)');
  return;
}
const numericAmount = parseFinishNumber(amount);
```

### Context Provider Pattern - ALWAYS USE
```typescript
const { expenses, addExpense, updateExpense, deleteExpense, getFilteredExpenses } = useExpenses();
```

## Code Standards

### Code Style - MUST FOLLOW
- **ES modules** (import/export), not CommonJS (require)
- **Destructure imports** when possible: `import { foo } from 'bar'`
- **TypeScript strict typing** - no any types
- **Finnish number utilities** for all monetary inputs
- **Responsive design** with Tailwind CSS
- **Dark mode support** via `useTheme()` hook

### Component Requirements
- All components use TypeScript with strict typing
- Error boundaries and loading states required
- Form validation with Finnish locale requirements
- Context Provider consumption via hooks

## Critical Domain Knowledge

### Expense Data Model
- **Core Entity**: `Expense` - required: `id`, `amount`, `category`, `description`, `date`
- **Categories**: Fixed set - Food, Transportation, Entertainment, Shopping, Bills, Other
- **Vendor field**: Optional for backward compatibility

### Component Architecture
```
App (page.tsx)
├── ExpenseProvider (Context)
├── ThemeProvider (Context)
├── Navigation (tab-based routing)
└── Content Components:
    ├── Dashboard (analytics/summary)
    ├── ExpenseForm (add/edit with Finnish validation)
    ├── ExpenseList (filtering/sorting/CRUD)
    ├── ExpenseCategories (category analytics)
    ├── TopVendors (vendor analytics)
    └── MonthlyInsights (trend analysis)
```

### Data Flow Pattern
1. ExpenseProvider loads from localStorage on mount
2. Components consume via `useExpenses()` hook
3. All mutations go through ExpenseProvider methods
4. ExpenseProvider automatically persists to localStorage
5. UI re-renders via Context updates

## Testing Requirements

### Testing Setup
- **Jest** with jsdom environment
- **React Testing Library** for component testing
- **Path mapping**: `@/` → `src/`
- **Transform config** for lucide-react, recharts, date-fns
- **Setup file**: `jest.setup.js`

### Testing Patterns - MUST FOLLOW
- Test Finnish number validation scenarios
- Test localStorage persistence and error handling
- Test Context Provider state management
- Test responsive design and dark mode
- Use TDD approach: write failing tests first

## Review Process Guidelines - CRITICAL

**Before submitting any code, YOU MUST complete these steps:**

1. **Run all commands**: `npm run lint`, `npm run build`, `npm test`
2. **Review outputs and iterate** until all issues resolved
3. **Assess compliance** - For each item, explicitly state ✅ or ❌:
   - Finnish number validation using `parseFinishNumber()`
   - Component follows Context Provider pattern
   - TypeScript strict typing maintained
   - Responsive design with Tailwind
   - Dark mode compatibility via `useTheme()`
   - LocalStorage persistence working
   - Error handling implemented
   - Test coverage adequate

**IMPORTANT**: Do not proceed without completing this checklist.

## Environment & Git Workflow

### Tool Usage Guidelines
- **Git**: Use descriptive commit messages, create feature branches
- **FORBIDDEN**: Never modify package.json without explicit permission
- **CAREFUL**: localStorage.ts changes require migration testing
- **READ FIRST**: Always examine existing patterns before coding

### Development Environment
- Development server runs on all interfaces (0.0.0.0:3000)
- Hot reloading enabled for TypeScript and CSS
- ESLint with Next.js recommended rules
- Git ignores include `.history/` for VS Code Local History

## Troubleshooting & Common Issues

### Finnish Number Format Errors
- Check proper comma usage in decimal inputs
- Ensure `parseFinishNumber` used for form processing
- Validate with `isValidFinishNumber()` before parsing

### LocalStorage Issues
- App relies entirely on localStorage - ensure browser support
- Handle quota exceeded errors gracefully
- Test data migration scenarios

### Context Updates
- All expense operations **MUST** go through ExpenseProvider methods
- Never directly mutate expense state
- Use hooks for all Context consumption

### Theme Persistence
- Dark/light mode managed by `useTheme` hook with localStorage backup
- Test theme switching across page reloads

## Performance Notes

### Context Management
- This file is loaded with every request - kept concise intentionally
- Use `/clear` between unrelated tasks to reset context
- Reference specific files rather than asking Claude to search
- Use SCRATCHPAD.md for complex planning

## Documentation System

### Custom Documentation Command
- **Available**: `@document-feature <feature-name>`
- **Location**: `.claude/commands/document-feature.md`
- **Generates**: 
  - Developer docs: `docs/dev/<feature>-implementation.md`
  - User guides: `docs/user/how-to-<feature>.md`
- **Includes**: Screenshot capture workflow