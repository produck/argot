import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Primitive from '../../src/Is/Primitive.mjs';

const cases = [
  ['String', 'x', 1],
  ['Number', 1, 'x'],
  ['Boolean', true, 1],
  ['Undefined', undefined, null],
  ['Object', {}, 1],
  ['Symbol', Symbol('s'), 's'],
  ['Bigint', 1n, 1],
];

for (const [name, hit, miss] of cases) {
  describe(`::${name}()`, () => {
    it('should accept a matching value', () => {
      assert.equal(Primitive[name](hit), true);
    });

    it('should reject a non-matching value', () => {
      assert.equal(Primitive[name](miss), false);
    });
  });
}

describe('>surface', () => {
  it('should expose exactly the typeof categories', () => {
    assert.deepEqual(Object.keys(Primitive).sort(), [
      'Bigint',
      'Boolean',
      'Number',
      'Object',
      'String',
      'Symbol',
      'Undefined',
    ]);
  });
});
