import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Common from '../src/Common.mjs';

describe('noop()', () => {
  it('should return undefined', () => {
    assert.equal(Common.noop(), undefined);
  });
});

describe('toUndefined()', () => {
  it('should be identical to noop', () => {
    assert.equal(Common.toUndefined, Common.noop);
  });

  it('should return undefined', () => {
    assert.equal(Common.toUndefined(), undefined);
  });
});

describe('toTrue()', () => {
  it('should return true', () => {
    assert.equal(Common.toTrue(), true);
  });
});

describe('toFalse()', () => {
  it('should return false', () => {
    assert.equal(Common.toFalse(), false);
  });
});

describe('toNull()', () => {
  it('should return null', () => {
    assert.equal(Common.toNull(), null);
  });
});

describe('passthrough()', () => {
  it('should return the given value', () => {
    const value = {};

    assert.equal(Common.passthrough(value), value);
  });
});

describe('sleep()', () => {
  it('should resolve with undefined', async () => {
    assert.equal(await Common.sleep(10), undefined);
  });

  it('should resolve asynchronously', async () => {
    let settled = false;
    const pending = Common.sleep(0).then(() => {
      settled = true;
    });

    assert.equal(settled, false);

    await pending;

    assert.equal(settled, true);
  });

  it('should throw when ms is not a number', () => {
    assert.throws(() => Common.sleep('10'), {
      name: 'TypeError',
      message: 'Invalid "args[0] as ms", one "non-negative integer" expected.',
    });
  });

  it('should throw when ms is negative', () => {
    assert.throws(() => Common.sleep(-1), {
      name: 'TypeError',
      message: 'Invalid "args[0] as ms", one "non-negative integer" expected.',
    });
  });

  it('should throw when ms is not an integer', () => {
    assert.throws(() => Common.sleep(1.5), {
      name: 'TypeError',
      message: 'Invalid "args[0] as ms", one "non-negative integer" expected.',
    });
  });
});

describe('ThrowFalse()', () => {
  it('should return the result of the given function', () => {
    assert.equal(Common.ThrowFalse(Common.toTrue)(), true);
  });

  it('should forward all arguments to the given function', () => {
    const args = [];
    const safe = Common.ThrowFalse((...values) => args.push(...values));

    safe(1, 'two', 3);

    assert.deepEqual(args, [1, 'two', 3]);
  });

  it('should return false when the given function throws', () => {
    const safe = Common.ThrowFalse(() => {
      throw new Error('boom');
    });

    assert.equal(safe(), false);
  });

  it('should throw when fn is not a function', () => {
    assert.throws(() => Common.ThrowFalse(1), {
      name: 'TypeError',
      message: 'Invalid "args[0] as fn", one "function" expected.',
    });
  });
});

describe('ReturnTrueThrowFalse()', () => {
  it('should be the same function as RTTF', () => {
    assert.equal(Common.RTTF, Common.ReturnTrueThrowFalse);
  });

  it('should return true when the given function returns', () => {
    assert.equal(Common.RTTF(Common.toTrue)(), true);
  });

  it('should return true even when the given function returns false', () => {
    assert.equal(Common.RTTF(Common.toFalse)(), true);
  });

  it('should forward all arguments to the given function', () => {
    const args = [];
    const report = Common.RTTF((...values) => args.push(...values));

    report(1, 'two', 3);

    assert.deepEqual(args, [1, 'two', 3]);
  });

  it('should return false when the given function throws', () => {
    const report = Common.RTTF(() => {
      throw new Error('boom');
    });

    assert.equal(report(), false);
  });

  it('should throw when fn is not a function', () => {
    assert.throws(() => Common.RTTF(1), {
      name: 'TypeError',
      message: 'Invalid "args[0] as fn", one "function" expected.',
    });
  });
});

describe('ResolveTrueRejectFalse()', () => {
  it('should be the same function as RTRF', () => {
    assert.equal(Common.RTRF, Common.ResolveTrueRejectFalse);
  });

  it('should resolve with true', async () => {
    assert.equal(await Common.RTRF(Promise.resolve(1)), true);
  });

  it('should resolve with true even when it resolves false', async () => {
    assert.equal(await Common.RTRF(Promise.resolve(false)), true);
  });

  it('should resolve with false when the given promise rejects', async () => {
    const rejection = Promise.reject(new Error('boom'));

    assert.equal(await Common.RTRF(rejection), false);
  });

  it('should throw when promise is not a Promise', () => {
    assert.throws(() => Common.RTRF(1), {
      name: 'TypeError',
      message: 'Invalid "args[0] as promise", one "Promise" expected.',
    });
  });
});

describe('resolveTrue()', () => {
  it('should resolve with true', async () => {
    assert.equal(await Common.resolveTrue(Promise.resolve(1)), true);
  });

  it('should reject when the given promise rejects', async () => {
    const rejection = Promise.reject(new Error('boom'));

    await assert.rejects(Common.resolveTrue(rejection), {
      name: 'Error',
      message: 'boom',
    });
  });

  it('should throw when promise is not a Promise', () => {
    assert.throws(() => Common.resolveTrue({}), {
      name: 'TypeError',
      message: 'Invalid "args[0] as promise", one "Promise" expected.',
    });
  });
});

describe('rejectFalse()', () => {
  it('should resolve with the given value', async () => {
    assert.equal(await Common.rejectFalse(Promise.resolve(1)), 1);
  });

  it('should resolve with false when the given promise rejects', async () => {
    const rejection = Promise.reject(new Error('boom'));

    assert.equal(await Common.rejectFalse(rejection), false);
  });

  it('should throw when promise is not a Promise', () => {
    assert.throws(() => Common.rejectFalse({}), {
      name: 'TypeError',
      message: 'Invalid "args[0] as promise", one "Promise" expected.',
    });
  });
});

describe('ignoreResolution()', () => {
  it('should resolve with undefined', async () => {
    assert.equal(await Common.ignoreResolution(Promise.resolve(1)), undefined);
  });

  it('should reject when the given promise rejects', async () => {
    const rejection = Promise.reject(new Error('boom'));

    await assert.rejects(Common.ignoreResolution(rejection), {
      name: 'Error',
      message: 'boom',
    });
  });

  it('should throw when promise is not a Promise', () => {
    assert.throws(() => Common.ignoreResolution({}), {
      name: 'TypeError',
      message: 'Invalid "args[0] as promise", one "Promise" expected.',
    });
  });
});

describe('ignoreRejection()', () => {
  it('should resolve with the given value', async () => {
    assert.equal(await Common.ignoreRejection(Promise.resolve(1)), 1);
  });

  it('should resolve with undefined when rejected', async () => {
    const rejection = Promise.reject(new Error('boom'));

    assert.equal(await Common.ignoreRejection(rejection), undefined);
  });

  it('should throw when promise is not a Promise', () => {
    assert.throws(() => Common.ignoreRejection(null), {
      name: 'TypeError',
      message: 'Invalid "args[0] as promise", one "Promise" expected.',
    });
  });
});
