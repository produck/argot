import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Common from '../src/Common.mjs';
import * as PromiseAdapter from '../src/Promise/Adapter.mjs';
import * as PromiseModule from '../src/Promise/index.mjs';
import * as SymbolTable from '../src/Symbol.mjs';
import * as Top from '../src/Top.mjs';

describe('>local re-exports', () => {
  it('should expose the top helpers by identity', () => {
    assert.equal(Common.noop, Top.noop);
    assert.equal(Common.passthrough, Top.passthrough);
    assert.equal(Common.instanceOf, Top.instanceOf);
  });

  it('should expose the symbol table by identity', () => {
    assert.equal(Common.CONSTRUCTOR, SymbolTable.CONSTRUCTOR);
  });

  it('should expose the promise helpers by identity', () => {
    assert.equal(Common.sleep, PromiseModule.sleep);
    assert.equal(Common.RTRF, PromiseAdapter.RTRF);
    assert.equal(Common.ignoreRejection, PromiseAdapter.ignoreRejection);
  });
});

describe('>type-error re-export', () => {
  it('should expose the assertion helpers', () => {
    assert.equal(typeof Common.AssertionChecker, 'function');
    assert.equal(typeof Common.ErrorMessage, 'function');
    assert.equal(typeof Common.ThrowTypeError, 'function');
  });

  it('should build a working assertion checker', () => {
    const assertNumber = Common.AssertionChecker(
      (value) => typeof value === 'number',
      'number',
    );

    assert.equal(assertNumber(1, 'args[0]'), undefined);
    assert.throws(() => assertNumber('x', 'args[0]'), TypeError);
  });

  it('should format a validation message', () => {
    assert.equal(
      Common.ErrorMessage('args[0]', 'number'),
      'Invalid "args[0]", one "number" expected.',
    );
  });

  it('should throw a TypeError', () => {
    assert.throws(() => Common.ThrowTypeError('args[0]', 'number'), {
      name: 'TypeError',
      message: 'Invalid "args[0]", one "number" expected.',
    });
  });
});

describe('>ow re-export', () => {
  it('should expose the ow namespace', () => {
    assert.equal(typeof Common.Ow, 'object');
    assert.equal(typeof Common.Ow.Thrower, 'function');
  });
});

describe('>behavior', () => {
  it('should sleep through the re-exported helper', async () => {
    assert.equal(await Common.sleep(0), undefined);
  });

  it('should collapse a rejection through the re-exported helper', async () => {
    const rejected = Promise.reject(new Error('boom'));

    assert.equal(await Common.ignoreRejection(rejected), undefined);
  });

  it('should report a resolution through the re-exported helper', async () => {
    assert.equal(await Common.RTRF(Promise.resolve(1)), true);
  });
});

describe('>surface', () => {
  it('should expose exactly the re-exported names', () => {
    assert.deepEqual(Object.keys(Common).sort(), [
      'AssertionChecker',
      'CONSTRUCTOR',
      'ErrorMessage',
      'Ow',
      'RTRF',
      'ThrowTypeError',
      'ignoreRejection',
      'instanceOf',
      'noop',
      'passthrough',
      'sleep',
    ]);
  });
});
