import { Holo } from './Holo';

export type Path = (string | number)[];

export type Item =
  | { [key: string]: Item }
  | Item[]
  | number
  | string
  | Holo
  | Type;

export type Input = { [key: string]: unknown };

export type Helper = {
  input?: Input;
  prevItem?: Item;
  index?: number;
  path?: Path;
  holo?: Holo;
};

export type Type = (helper?: Helper) => Item;
export type Types = { [key: string]: Type };
export type CustomType = (args?: { [key: string]: unknown }) => Type;
export type CustomTypes = { [key: string]: CustomType };
