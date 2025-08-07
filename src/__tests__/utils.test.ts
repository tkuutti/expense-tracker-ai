import { formatCurrency, formatDate, generateId, parseFinishNumber, formatFinishNumber, isValidFinishNumber } from '@/lib/utils';

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

  describe('parseFinishNumber', () => {
    test('parses valid Finnish number format with comma decimal separator', () => {
      expect(parseFinishNumber('15,50')).toBe(15.5);
      expect(parseFinishNumber('100,25')).toBe(100.25);
      expect(parseFinishNumber('0,99')).toBe(0.99);
      expect(parseFinishNumber('1000,00')).toBe(1000);
    });

    test('parses whole numbers without decimal separator', () => {
      expect(parseFinishNumber('15')).toBe(15);
      expect(parseFinishNumber('100')).toBe(100);
      expect(parseFinishNumber('0')).toBe(0);
      expect(parseFinishNumber('1000')).toBe(1000);
    });

    test('handles empty or whitespace input', () => {
      expect(parseFinishNumber('')).toBe(0);
      expect(parseFinishNumber('   ')).toBe(0);
      expect(parseFinishNumber('  \t  ')).toBe(0);
    });

    test('handles invalid input gracefully', () => {
      expect(parseFinishNumber('abc')).toBe(0);
      expect(parseFinishNumber('15.50')).toBe(0); // Dot instead of comma
      expect(parseFinishNumber('15,50,25')).toBe(0); // Multiple commas
      expect(parseFinishNumber('15,abc')).toBe(0); // Invalid decimal part
    });
  });

  describe('formatFinishNumber', () => {
    test('formats numbers with Finnish locale (comma as decimal separator)', () => {
      expect(formatFinishNumber(15.5)).toBe('15,5');
      expect(formatFinishNumber(100.25)).toBe('100,25');
      expect(formatFinishNumber(0.99)).toBe('0,99');
      expect(formatFinishNumber(1000)).toBe('1\u00A0000'); // Finnish locale adds non-breaking space for thousands
    });

    test('handles whole numbers without decimals', () => {
      expect(formatFinishNumber(15)).toBe('15');
      expect(formatFinishNumber(100)).toBe('100');
      expect(formatFinishNumber(0)).toBe('0');
    });

    test('limits decimal places to maximum 2', () => {
      expect(formatFinishNumber(15.123456)).toBe('15,12');
      expect(formatFinishNumber(100.999)).toBe('101'); // Rounds up
      expect(formatFinishNumber(0.001)).toBe('0');
    });
  });

  describe('isValidFinishNumber', () => {
    test('validates correct Finnish number format', () => {
      expect(isValidFinishNumber('15,50')).toBe(true);
      expect(isValidFinishNumber('100,25')).toBe(true);
      expect(isValidFinishNumber('0,99')).toBe(true);
      expect(isValidFinishNumber('1000,00')).toBe(true);
      expect(isValidFinishNumber('5,1')).toBe(true);
    });

    test('validates whole numbers without decimals', () => {
      expect(isValidFinishNumber('15')).toBe(true);
      expect(isValidFinishNumber('100')).toBe(true);
      expect(isValidFinishNumber('0')).toBe(true);
      expect(isValidFinishNumber('1000')).toBe(true);
    });

    test('rejects invalid formats', () => {
      expect(isValidFinishNumber('')).toBe(false);
      expect(isValidFinishNumber('   ')).toBe(false);
      expect(isValidFinishNumber('abc')).toBe(false);
      expect(isValidFinishNumber('15.50')).toBe(false); // Dot instead of comma
      expect(isValidFinishNumber('15,50,25')).toBe(false); // Multiple commas
      expect(isValidFinishNumber('15,')).toBe(false); // Comma without decimal
      expect(isValidFinishNumber(',50')).toBe(false); // Comma without whole part
      expect(isValidFinishNumber('15,abc')).toBe(false); // Invalid decimal part
      expect(isValidFinishNumber('15,123')).toBe(false); // More than 2 decimal places
      expect(isValidFinishNumber('-15,50')).toBe(false); // Negative numbers
    });

    test('handles whitespace correctly', () => {
      expect(isValidFinishNumber(' 15,50 ')).toBe(true); // Trims whitespace
      expect(isValidFinishNumber('  100  ')).toBe(true);
    });
  });
});