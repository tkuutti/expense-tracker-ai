import { formatCurrency, formatDate, generateId } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    test('formats currency correctly with Finnish locale', () => {
      expect(formatCurrency(100)).toContain('100');
      expect(formatCurrency(100)).toContain('€');
      expect(formatCurrency(1234.56)).toMatch(/1.*234/); // Allow for spaces in large numbers
      expect(formatCurrency(1234.56)).toContain('€');
      expect(formatCurrency(0)).toContain('0');
      expect(formatCurrency(0)).toContain('€');
    });
  });

  describe('formatDate', () => {
    test('formats date correctly with Finnish locale', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(formatted).toContain('25');
      expect(formatted).toContain('2023');
    });

    test('formats date string correctly', () => {
      const dateString = '2023-12-25T00:00:00.000Z';
      const formatted = formatDate(dateString);
      expect(formatted).toContain('25');
      expect(formatted).toContain('2023');
    });
  });

  describe('generateId', () => {
    test('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
    });
  });
});