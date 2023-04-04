import Chance from 'chance';
import { faker } from '@faker-js/faker';

import * as holoTypes from './types';
import type { Item, Type, Types, CustomTypes } from './declarations';

const chance = new Chance();

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 12 * MONTH;

export class Holo {
  static SECOND = SECOND;
  static MINUTE = MINUTE;
  static HOUR = HOUR;
  static DAY = DAY;
  static WEEK = WEEK;
  static MONTH = MONTH;
  static YEAR = YEAR;

  static types: CustomTypes = holoTypes;

  static chance = chance;
  static faker = faker;

  private _input = {};
  private _repeat = 1;
  private _prevItem: Item = undefined;
  private _index = 0;
  private _customTypes: Types = {};
  private _parent: Holo = undefined;
  private _schema = undefined;

  static of() {
    return new Holo();
  }

  get parent() {
    return this._parent;
  }

  getInput() {
    return this._input;
  }

  getCustomTypes() {
    return this._customTypes;
  }

  setParent(parent: Holo) {
    this._parent = parent;
    return this;
  }

  // TODO
  // clone() {}

  addType(name: string, fn: Type) {
    this._customTypes[name] = fn;
    return this;
  }

  addTypes(customTypes: Types) {
    this._customTypes = { ...this._customTypes, ...customTypes };
    return this;
  }

  input(input = {}) {
    this._input = { ...this._input, ...input };
    return this;
  }

  schema(schema = {}) {
    this._schema = schema;
    return this;
  }

  repeat(repeat: number) {
    this._repeat = repeat;
    return this;
  }

  generate(num?: number) {
    this._prevItem = undefined;
    return Array(num ? num : this._repeat)
      .fill(null)
      .map((_x, i) => {
        this._index = i;
        this._prevItem = this._eval(this._schema);
        return this._prevItem;
      });
  }

  _eval(node: Item, path = []) {
    if (Array.isArray(node)) {
      // If it is array
      return node.map((subnode, i) => {
        return this._eval(subnode, [...path, i]);
      });
    } else if (
      typeof node === 'string' &&
      this._customTypes[node] !== undefined
    ) {
      // Is a custom method?
      return this._customTypes[node]({
        input: this._input,
        prevItem: this._prevItem,
        index: this._index,
        path,
        holo: this,
      });
    } else if (typeof node === 'string' && chance[node] !== undefined) {
      // Is a chance method?
      return chance[node]();
    } else if (typeof node === 'function') {
      // Is a custom function
      return node({
        input: this._input,
        prevItem: this._prevItem,
        index: this._index,
        path,
        holo: this,
      });
    } else if (node instanceof Holo) {
      // Other Holo then merge configuration
      return node
        .input({ ...this._input, ...node.getInput() })
        .addTypes({ ...this._customTypes, ...node.getCustomTypes() })
        .setParent(this)
        .generate();
    } else if (typeof node === 'object' && node.constructor === Object) {
      // Is a object scheme
      const result = {};
      for (const key in node) {
        if (Object.prototype.hasOwnProperty.call(node, key)) {
          result[key] = this._eval(node[key], [...path, key]);
        }
      }
      return result;
    }
    return node;
  }
}
