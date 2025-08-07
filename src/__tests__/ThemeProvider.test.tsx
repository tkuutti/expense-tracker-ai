import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

// Mock window.matchMedia
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  value: mockMatchMedia,
  writable: true,
});

// Mock document.documentElement
const mockDocumentElement = {
  classList: {
    add: jest.fn(),
    remove: jest.fn(),
  },
};

Object.defineProperty(document, 'documentElement', {
  value: mockDocumentElement,
  writable: true,
});

// Wrapper component for testing hooks
const createWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset localStorage mock
    mockLocalStorage.getItem.mockReturnValue(null);
    
    // Reset matchMedia mock
    mockMatchMedia.mockReturnValue({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });

    // Reset document element class list mock
    mockDocumentElement.classList.add.mockClear();
    mockDocumentElement.classList.remove.mockClear();
  });

  describe('Initialization', () => {
    test('initializes with light theme by default when no saved preference', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      });

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.isDark).toBe(false);
    });

    test('initializes with saved theme preference from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.isDark).toBe(true);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('expense-tracker-theme');
    });

    test('respects system preference when no saved preference', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({
        matches: true, // Prefers dark mode
        addListener: jest.fn(),
        removeListener: jest.fn(),
      });

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.isDark).toBe(true);
      expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    });

    test('ignores invalid saved theme preference', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-theme');
      mockMatchMedia.mockReturnValue({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      });

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('light');
    });
  });

  describe('Theme Switching', () => {
    test('toggles from light to dark', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('light');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.isDark).toBe(true);
    });

    test('toggles from dark to light', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('dark');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.isDark).toBe(false);
    });
  });

  describe('DOM and Storage Updates', () => {
    test('applies dark theme classes to document element', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.toggleTheme();
      });

      // Should add dark class and remove light class
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('light');
    });

    test('applies light theme classes to document element', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.toggleTheme();
      });

      // Should add light class and remove dark class
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('light');
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
    });

    test('saves theme preference to localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('expense-tracker-theme', 'dark');
    });

    test('applies initial theme classes to document element on mount', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('light');
    });
  });

  describe('Context Values', () => {
    test('provides correct context values for light theme', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.isDark).toBe(false);
      expect(typeof result.current.toggleTheme).toBe('function');
    });

    test('provides correct context values for dark theme', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.isDark).toBe(true);
      expect(typeof result.current.toggleTheme).toBe('function');
    });
  });

  describe('Multiple Toggles', () => {
    test('handles multiple theme toggles correctly', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('light');

      // Toggle to dark
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('dark');
      expect(mockLocalStorage.setItem).toHaveBeenLastCalledWith('expense-tracker-theme', 'dark');

      // Toggle back to light
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('light');
      expect(mockLocalStorage.setItem).toHaveBeenLastCalledWith('expense-tracker-theme', 'light');

      // Toggle to dark again
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('dark');
      expect(mockLocalStorage.setItem).toHaveBeenLastCalledWith('expense-tracker-theme', 'dark');
    });
  });

  describe('Storage Key Consistency', () => {
    test('uses consistent storage key for theme persistence', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('expense-tracker-theme');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('expense-tracker-theme', expect.any(String));
    });
  });

  describe('Error Handling', () => {
    test('throws error when useTheme is used outside ThemeProvider', () => {
      // Mock console.error to avoid error output in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('System Preference Integration', () => {
    test('falls back to system preference when localStorage is empty', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({
        matches: true, // System prefers dark
        addListener: jest.fn(),
        removeListener: jest.fn(),
      });

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('dark');
      expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    });

    test('prefers saved setting over system preference', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      mockMatchMedia.mockReturnValue({
        matches: true, // System prefers dark but saved preference is light
        addListener: jest.fn(),
        removeListener: jest.fn(),
      });

      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper,
      });

      expect(result.current.theme).toBe('light');
    });
  });
});