import { CustomType } from '../declarations';
import { get } from './utils';

export const sequentialTimestamp: CustomType =
  (args = {}) =>
  (helper = {}) => {
    const input = {
      from: Date.now(),
      every: 60000,
      ...(helper?.input ?? {}),
      ...args,
    };
    return helper.prevItem
      ? get(helper.prevItem, helper.path) + input.every
      : input.from;
  };
