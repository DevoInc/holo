import { describe, it, expect } from 'vitest';

import { sequentialNumbers } from './sequentialNumber';

describe('types', () => {
  describe('sequentialNumber', () => {
    it('default', () => {
      const delta = 2;
      const fn = sequentialNumbers({ start: 5, delta });
      const a = fn() as number;
      const b = fn({ prevItem: a, path: [] }) as number;
      const c = fn({ prevItem: b, path: [] }) as number;

      expect(a).toBe(5);
      expect(b).toBeGreaterThanOrEqual(a - delta);
      expect(b).toBeLessThanOrEqual(a + delta);
      expect(c).toBeGreaterThanOrEqual(b - delta);
      expect(c).toBeLessThanOrEqual(b + delta);
    });
  });
});
