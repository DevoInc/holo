import { describe, it, expect } from 'vitest';

import { Holo } from './Holo';

describe('Holo', () => {
  it('general', () => {
    expect(Holo.of().schema({ test: 'test' }).repeat(2).generate()).toEqual([
      { test: 'test' },
      { test: 'test' },
    ]);
  });

  it('input and customTypes', () => {
    const now = Date.now();
    expect(
      Holo.of()
        .input({ from: now, every: Holo.SECOND })
        .addType('test', Holo.types.sequentialTimestamp())
        .schema({ test: 'test' })
        .repeat(2)
        .generate(),
    ).toEqual([{ test: now }, { test: now + 1000 }]);
  });

  it('nested Holos inherit inputs and types', () => {
    const now = Date.now();
    expect(
      Holo.of()
        .input({ from: now, every: Holo.SECOND })
        .addType('test', Holo.types.sequentialTimestamp())
        .schema({ test: Holo.of().schema('test').repeat(2) })
        .repeat(2)
        .generate(),
    ).toEqual([{ test: [now, now + 1000] }, { test: [now, now + 1000] }]);
  });
});
