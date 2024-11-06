import { describe, it, expect } from 'vitest';

import { sequentialTimestamp } from './sequentialTimestamp';

describe('types', () => {
  describe('sequentialTimestamp', () => {
    const now = Date.now();

    it('simple value', () => {
      const fn = sequentialTimestamp({ from: now, every: 1000 });
      const a = fn();
      const b = fn({ prevItem: a, path: [] });

      expect(a).toBe(now);
      expect(b).toBe(now + 1000);
    });

    it('nested value', () => {
      const fn = sequentialTimestamp({ from: now, every: 1000 });
      const a = fn();
      const b = fn({
        prevItem: { p1: { p2: { p3: a } } },
        path: ['p1', 'p2', 'p3'],
      });

      expect(a).toBe(now);
      expect(b).toBe(now + 1000);
    });
  });
});
