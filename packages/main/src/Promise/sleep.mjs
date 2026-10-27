import { AssertionChecker as Checker } from '@produck/type-error';

import { NonNegativeInteger } from '../Is/Compound.mjs';

const assertMillisecond = Checker(NonNegativeInteger, 'non-negative integer');

export function sleep(ms) {
  assertMillisecond(ms, 'args[0] as ms');

  return new Promise((resolve) => setTimeout(resolve, ms));
}
