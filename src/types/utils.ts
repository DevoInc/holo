import type { Item, Path } from '../declarations';

// Like lodash get but with check for undefined path
export const get = (item: Item, path: Path) =>
  path.length > 0 ? get(item[path[0]], path.slice(1)) : item;
