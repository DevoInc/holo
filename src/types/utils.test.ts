import { describe, test, expect } from 'vitest';

import { get } from './utils';

describe('types', () => {
  describe('utils', () => {
    test('get', () => {
      expect(get({ a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(1);
      expect(get(1, [])).toBe(1);
      expect(get({ a: [{ b: 1 }] }, ['a', 0, 'b'])).toBe(1);
      expect(get({}, ['a'])).toBeUndefined();
    });
  });
});
