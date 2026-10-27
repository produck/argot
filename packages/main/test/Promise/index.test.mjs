import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as PromiseModule from '../../src/Promise/index.mjs';

describe('::sleep()', () => {
  it('should resolve with undefined', async () => {
    assert.equal(await PromiseModule.sleep(0), undefined);
  });

  it('should resolve asynchronously', async () => {
    let settled = false;

    const pending = PromiseModule.sleep(0).then(() => {
      settled = true;
    });

    assert.equal(settled, false);

    await pending;

    assert.equal(settled, true);
  });

  it('should accept zero', async () => {
    assert.equal(await PromiseModule.sleep(0), undefined);
  });

  it('should throw when ms is not a non-negative integer', () => {
    assert.throws(() => PromiseModule.sleep(-1), {
      name: 'TypeError',
      message: 'Invalid "args[0] as ms", one "non-negative integer" expected.',
    });
  });

  it('should throw when ms is not a number', () => {
    assert.throws(() => PromiseModule.sleep('10'), TypeError);
  });
});

describe('>Adapter', () => {
  it('should expose the adapter namespace', () => {
    assert.equal(
      typeof PromiseModule.Adapter.ResolveTrueRejectFalse,
      'function',
    );
  });
});
