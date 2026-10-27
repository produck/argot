import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Top from '../src/Top.mjs';

describe('::noop()', () => {
  it('should return undefined', () => {
    assert.equal(Top.noop(), undefined);
  });
});

describe('::passthrough()', () => {
  it('should return the given value', () => {
    const value = {};

    assert.equal(Top.passthrough(value), value);
  });
});

describe('::instanceOf()', () => {
  it('should accept a matching instance', () => {
    assert.equal(Top.instanceOf(new Date(), Date), true);
  });

  it('should reject a non-matching instance', () => {
    assert.equal(Top.instanceOf({}, Date), false);
  });
});
