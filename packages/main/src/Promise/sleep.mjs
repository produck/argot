import { AssertionChecker as Checker } from '@produck/type-error';

import { NonNegativeInteger } from '../Is/Compound.mjs';

const assertNonNegativeInteger = Checker(
  NonNegativeInteger,
  'non-negative integer',
);

export function sleep(ms) {
  assertNonNegativeInteger(ms, 'args[0] as ms');

  return new Promise((resolve) => setTimeout(resolve, ms));
}
