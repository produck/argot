import { ThrowFalse } from '../Boolean/Adapter.mjs';
import { IteratorPrototype } from '../Intrinsic.mjs';
import * as Instance from './Instance.mjs';

function has(value, key, type) {
  return value != null && typeof value[key] === type;
}

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isNegativeInteger(value) {
  return Number.isInteger(value) && value < 0;
}

function isNonPositiveInteger(value) {
  return Number.isInteger(value) && value <= 0;
}

function isPositiveNumber(value) {
  return typeof value === 'number' && value > 0;
}

function isNegativeNumber(value) {
  return typeof value === 'number' && value < 0;
}

function isNonNegativeNumber(value) {
  return typeof value === 'number' && value >= 0;
}

function isNonPositiveNumber(value) {
  return typeof value === 'number' && value <= 0;
}

const isValidDate = ThrowFalse(function isValidDate(value) {
  return Instance.Date(value) && !Number.isNaN(value.getTime());
});

const isPlainObject = ThrowFalse(function isPlainObject(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === null || prototype === Object.prototype;
});

const isErrorLike = ThrowFalse(function isErrorLike(value) {
  return has(value, 'message', 'string');
});

const isThenable = ThrowFalse(function isThenable(value) {
  return has(value, 'then', 'function');
});

const isIterable = ThrowFalse(function isIterable(value) {
  return has(value, Symbol.iterator, 'function');
});

const isAsyncIterable = ThrowFalse(function isAsyncIterable(value) {
  return has(value, Symbol.asyncIterator, 'function');
});

const isIterator = ThrowFalse(function isIterator(value) {
  return has(value, 'next', 'function');
});

const isWellFormedIterator = ThrowFalse(function isWellFormedIterator(value) {
  if (has(value, 'next', 'function') === false) {
    return false;
  }

  if (has(value, Symbol.iterator, 'function') === false) {
    return false;
  }

  return value[Symbol.iterator]() === value;
});

const isBuiltinIterator = ThrowFalse(function isBuiltinIterator(value) {
  return Object.prototype.isPrototypeOf.call(IteratorPrototype, value);
});

export {
  isNonNegativeInteger as NonNegativeInteger,
  isPositiveInteger as PositiveInteger,
  isNegativeInteger as NegativeInteger,
  isNonPositiveInteger as NonPositiveInteger,
  isPositiveNumber as PositiveNumber,
  isNegativeNumber as NegativeNumber,
  isNonNegativeNumber as NonNegativeNumber,
  isNonPositiveNumber as NonPositiveNumber,
  isValidDate as ValidDate,
  isPlainObject as PlainObject,
  isErrorLike as ErrorLike,
  isThenable as Thenable,
  isIterable as Iterable,
  isAsyncIterable as AsyncIterable,
  isIterator as Iterator,
  isWellFormedIterator as WellFormedIterator,
  isBuiltinIterator as BuiltinIterator,
};
