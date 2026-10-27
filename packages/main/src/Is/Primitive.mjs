const isString = (value) => typeof value === 'string';
const isNumber = (value) => typeof value === 'number';
const isBoolean = (value) => typeof value === 'boolean';
const isUndefined = (value) => typeof value === 'undefined';
const isObject = (value) => typeof value === 'object';
const isSymbol = (value) => typeof value === 'symbol';
const isBigint = (value) => typeof value === 'bigint';

export {
  isString as String,
  isNumber as Number,
  isBoolean as Boolean,
  isUndefined as Undefined,
  isObject as Object,
  isSymbol as Symbol,
  isBigint as Bigint,
};
