import { AssertionChecker as Checker } from '@produck/type-error';

const Is = {
  Function: (value) => typeof value === 'function',
  NonNegativeInteger: (value) => Number.isInteger(value) && value >= 0,
  Promise: (value) => value instanceof Promise,
};

const Assert = {
  Function: Checker(Is.Function, 'function'),
  NonNegativeInteger: Checker(Is.NonNegativeInteger, 'non-negative integer'),
  Promise: Checker(Is.Promise, 'Promise'),
};

export const noop = () => {};

export const toTrue = () => true;

export const toFalse = () => false;

export const toNull = () => null;

export const passthrough = (any) => any;

export function sleep(ms) {
  Assert.NonNegativeInteger(ms, 'args[0] as ms');

  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ThrowFalse(fn) {
  Assert.Function(fn, 'args[0] as fn');

  return (...args) => {
    try {
      return fn(...args);
    } catch {
      return false;
    }
  };
}

export function ReturnTrueThrowFalse(fn) {
  Assert.Function(fn, 'args[0] as fn');

  return (...args) => {
    try {
      fn(...args);

      return true;
    } catch {
      return false;
    }
  };
}

export function ResolveTrueRejectFalse(promise) {
  Assert.Promise(promise, 'args[0] as promise');

  return promise.then(toTrue, toFalse);
}

export function resolveTrue(promise) {
  Assert.Promise(promise, 'args[0] as promise');

  return promise.then(toTrue);
}

export function rejectFalse(promise) {
  Assert.Promise(promise, 'args[0] as promise');

  return promise.catch(toFalse);
}

export function ignoreResolution(promise) {
  Assert.Promise(promise, 'args[0] as promise');

  return promise.then(noop);
}

export function ignoreRejection(promise) {
  Assert.Promise(promise, 'args[0] as promise');

  return promise.catch(noop);
}

export { ResolveTrueRejectFalse as RTRF };
export { ReturnTrueThrowFalse as RTTF };
