import { AssertionChecker as Checker } from '@produck/type-error';

import * as Type from '../Is/Type.mjs';

const assertFunction = Checker(Type.Function, 'function');

export function ThrowFalse(fn) {
  assertFunction(fn, 'args[0] as fn');

  return (...args) => {
    try {
      return fn(...args);
    } catch {
      return false;
    }
  };
}

export function ReturnTrueThrowFalse(fn) {
  assertFunction(fn, 'args[0] as fn');

  return (...args) => {
    try {
      fn(...args);

      return true;
    } catch {
      return false;
    }
  };
}

export { ReturnTrueThrowFalse as RTTF };
