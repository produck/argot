import { AssertionChecker as Checker } from '@produck/type-error';

import * as Top from '../Top.mjs';
import * as Constant from '../Constant.mjs';
import * as Instance from '../Is/Instance.mjs';

const assertPromise = Checker(Instance.Promise, 'Promise');

export function ResolveTrueRejectFalse(promise) {
  assertPromise(promise, 'args[0] as promise');

  return promise.then(Constant.toTrue, Constant.toFalse);
}

export function resolveTrue(promise) {
  assertPromise(promise, 'args[0] as promise');

  return promise.then(Constant.toTrue);
}

export function rejectFalse(promise) {
  assertPromise(promise, 'args[0] as promise');

  return promise.catch(Constant.toFalse);
}

export function ignoreResolution(promise) {
  assertPromise(promise, 'args[0] as promise');

  return promise.then(Top.noop);
}

export function ignoreRejection(promise) {
  assertPromise(promise, 'args[0] as promise');

  return promise.catch(Top.noop);
}

export { ResolveTrueRejectFalse as RTRF };
