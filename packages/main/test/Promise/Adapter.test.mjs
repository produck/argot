import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Adapter from '../../src/Promise/Adapter.mjs';

const rejects = () => Promise.reject(new Error('boom'));

describe('::ResolveTrueRejectFalse()', () => {
  it('should resolve true when the promise resolves', async () => {
    assert.equal(
      await Adapter.ResolveTrueRejectFalse(Promise.resolve(1)),
      true,
    );
  });

  it('should resolve false when the promise rejects', async () => {
    assert.equal(await Adapter.ResolveTrueRejectFalse(rejects()), false);
  });

  it('should throw when the argument is not a promise', () => {
    assert.throws(() => Adapter.ResolveTrueRejectFalse(1), TypeError);
  });
});

describe('::resolveTrue()', () => {
  it('should resolve true', async () => {
    assert.equal(await Adapter.resolveTrue(Promise.resolve(1)), true);
  });

  it('should propagate a rejection', async () => {
    await assert.rejects(() => Adapter.resolveTrue(rejects()));
  });

  it('should throw when the argument is not a promise', () => {
    assert.throws(() => Adapter.resolveTrue(1), TypeError);
  });
});

describe('::rejectFalse()', () => {
  it('should pass the resolved value through', async () => {
    assert.equal(await Adapter.rejectFalse(Promise.resolve(5)), 5);
  });

  it('should resolve false on rejection', async () => {
    assert.equal(await Adapter.rejectFalse(rejects()), false);
  });

  it('should throw when the argument is not a promise', () => {
    assert.throws(() => Adapter.rejectFalse(1), TypeError);
  });
});

describe('::ignoreResolution()', () => {
  it('should resolve undefined', async () => {
    assert.equal(await Adapter.ignoreResolution(Promise.resolve(5)), undefined);
  });

  it('should propagate a rejection', async () => {
    await assert.rejects(() => Adapter.ignoreResolution(rejects()));
  });

  it('should throw when the argument is not a promise', () => {
    assert.throws(() => Adapter.ignoreResolution(1), TypeError);
  });
});

describe('::ignoreRejection()', () => {
  it('should pass the resolved value through', async () => {
    assert.equal(await Adapter.ignoreRejection(Promise.resolve(5)), 5);
  });

  it('should resolve undefined on rejection', async () => {
    assert.equal(await Adapter.ignoreRejection(rejects()), undefined);
  });

  it('should throw when the argument is not a promise', () => {
    assert.throws(() => Adapter.ignoreRejection(1), TypeError);
  });
});

describe('>RTRF', () => {
  it('should alias ResolveTrueRejectFalse', () => {
    assert.equal(Adapter.RTRF, Adapter.ResolveTrueRejectFalse);
  });
});
