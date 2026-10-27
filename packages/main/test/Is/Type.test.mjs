import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { runInNewContext } from 'node:vm';
import * as Primitive from '../../src/Is/Primitive.mjs';
import * as Type from '../../src/Is/Type.mjs';

describe('::Function()', () => {
  it('should accept every callable form', () => {
    const callables = [
      () => {},
      function () {},
      class {},
      async function () {},
      function* () {},
    ];

    for (const value of callables) {
      assert.equal(Type.Function(value), true);
    }
  });

  it('should reject every non-callable value', () => {
    const others = [{}, [], null, undefined, 1, 'x', Symbol('s')];

    for (const value of others) {
      assert.equal(Type.Function(value), false);
    }
  });

  it('should accept a function built in another realm', () => {
    assert.equal(Type.Function(runInNewContext('(function () {})')), true);
  });
});

describe('>surface', () => {
  it('should re-export the primitive checks', () => {
    for (const name of Object.keys(Primitive)) {
      assert.equal(Type[name], Primitive[name]);
    }
  });

  it('should carry Function on top of the primitive checks', () => {
    assert.deepEqual(Object.keys(Type).sort(), [
      'Bigint',
      'Boolean',
      'Function',
      'Number',
      'Object',
      'String',
      'Symbol',
      'Undefined',
    ]);
  });
});
