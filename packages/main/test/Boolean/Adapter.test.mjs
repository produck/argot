import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Adapter from '../../src/Boolean/Adapter.mjs';

describe('::ThrowFalse()', () => {
  it('should return the wrapped result', () => {
    assert.equal(Adapter.ThrowFalse(() => 1)(), 1);
  });

  it('should forward all arguments', () => {
    const args = [];

    Adapter.ThrowFalse((...values) => args.push(...values))(1, 'two', 3);

    assert.deepEqual(args, [1, 'two', 3]);
  });

  it('should return false when the function throws', () => {
    const throws = () => {
      throw new Error('boom');
    };

    assert.equal(Adapter.ThrowFalse(throws)(), false);
  });

  it('should throw when fn is not a function', () => {
    assert.throws(() => Adapter.ThrowFalse(1), {
      name: 'TypeError',
      message: 'Invalid "args[0] as fn", one "function" expected.',
    });
  });
});

describe('::ReturnTrueThrowFalse()', () => {
  it('should return true when the function returns', () => {
    assert.equal(Adapter.ReturnTrueThrowFalse(() => {})(), true);
  });

  it('should return true even when the function returns false', () => {
    assert.equal(Adapter.ReturnTrueThrowFalse(() => false)(), true);
  });

  it('should return false when the function throws', () => {
    const throws = () => {
      throw new Error('boom');
    };

    assert.equal(Adapter.ReturnTrueThrowFalse(throws)(), false);
  });

  it('should throw when fn is not a function', () => {
    assert.throws(() => Adapter.ReturnTrueThrowFalse(1), {
      name: 'TypeError',
      message: 'Invalid "args[0] as fn", one "function" expected.',
    });
  });
});

describe('>RTTF', () => {
  it('should alias ReturnTrueThrowFalse', () => {
    assert.equal(Adapter.RTTF, Adapter.ReturnTrueThrowFalse);
  });
});
