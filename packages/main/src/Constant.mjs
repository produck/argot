export { noop as alwaysUndefined } from './Top.mjs';

export const toTrue = () => true;

export const toFalse = () => false;

export const toNull = () => null;

export { toTrue as alwaysTrue, toFalse as alwaysFalse, toNull as alwaysNull };

export function Always(value) {
  return () => value;
}
