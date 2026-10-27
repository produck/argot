import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Constant from '../src/Constant.mjs';

describe('::toTrue()', () => {
  it('should return true', () => {
    assert.equal(Constant.toTrue(), true);
  });
});

describe('::toFalse()', () => {
  it('should return false', () => {
    assert.equal(Constant.toFalse(), false);
  });
});

describe('::toNull()', () => {
  it('should return null', () => {
    assert.equal(Constant.toNull(), null);
  });
});

describe('::alwaysUndefined()', () => {
  it('should return undefined', () => {
    assert.equal(Constant.alwaysUndefined(), undefined);
  });
});

describe('>aliases', () => {
  it('should point at the same functions', () => {
    assert.equal(Constant.alwaysTrue, Constant.toTrue);
    assert.equal(Constant.alwaysFalse, Constant.toFalse);
    assert.equal(Constant.alwaysNull, Constant.toNull);
  });
});

describe('::Always()', () => {
  it('should return a function yielding the given value', () => {
    const always = Constant.Always(7);

    assert.equal(always(), 7);
    assert.equal(always(), 7);
  });
});
