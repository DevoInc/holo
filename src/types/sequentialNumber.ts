import Chance from 'chance';

import { CustomType } from '../declarations';
import { get } from './utils';

const chance = new Chance();

export const sequentialNumbers: CustomType =
  (args = {}) =>
  (helper = {}) => {
    const input = {
      delta: 5,
      min: 0,
      max: 100,
      start: undefined,
      floating: false,
      ...(helper?.input ?? {}),
      ...args,
    };
    if (helper.prevItem) {
      const delta = chance[input.floating ? 'floating' : 'integer']({
        min: -input.delta,
        max: input.delta,
      });
      const prevValue = get(helper.prevItem, helper.path);
      return prevValue + delta < input.min || prevValue + delta > input.max
        ? prevValue - delta
        : prevValue + delta;
    } else {
      return input.start
        ? input.start
        : chance[input.floating ? 'floating' : 'integer']({
            min: input.min,
            max: input.max,
          });
    }
  };
