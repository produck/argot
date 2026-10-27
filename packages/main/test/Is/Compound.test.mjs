import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Compound from '../../src/Is/Compound.mjs';

const cases = [
  ['NonNegativeInteger', 0, -1],
  ['PositiveInteger', 1, 0],
  ['NegativeInteger', -1, 0],
  ['NonPositiveInteger', 0, 1],
  ['PositiveNumber', 0.5, 0],
  ['NegativeNumber', -0.5, 0],
  ['NonNegativeNumber', 0, -0.5],
  ['NonPositiveNumber', 0, 0.5],
  ['ValidDate', new Date(), new Date('nope')],
  ['PlainObject', {}, new Map()],
  ['ErrorLike', new Error('e'), {}],
  ['Thenable', Promise.resolve(), {}],
  ['Iterable', [], {}],
  ['AsyncIterable', (async function* () {})(), []],
  ['Iterator', [][Symbol.iterator](), {}],
  ['WellFormedIterator', [][Symbol.iterator](), { next() {} }],
  ['BuiltinIterator', [][Symbol.iterator](), {}],
];

for (const [name, hit, miss] of cases) {
  describe(`::${name}()`, () => {
    it('should accept a matching value', () => {
      assert.equal(Compound[name](hit), true);
    });

    it('should reject a non-matching value', () => {
      assert.equal(Compound[name](miss), false);
    });
  });
}

describe('>nullish input', () => {
  it('should reject null and undefined without throwing', () => {
    for (const name of Object.keys(Compound)) {
      assert.equal(Compound[name](null), false, name);
      assert.equal(Compound[name](undefined), false, name);
    }
  });
});

describe('>hostile input', () => {
  it('should reject a revoked proxy without throwing', () => {
    const { proxy, revoke } = Proxy.revocable({}, {});
    const guarded = [
      'ValidDate',
      'PlainObject',
      'ErrorLike',
      'Thenable',
      'Iterable',
      'AsyncIterable',
      'Iterator',
      'WellFormedIterator',
      'BuiltinIterator',
    ];

    revoke();

    for (const name of guarded) {
      assert.equal(Compound[name](proxy), false, name);
    }
  });

  it('should reject a throwing getter without throwing', () => {
    const trap = {
      get [Symbol.iterator]() {
        throw new Error('boom');
      },
    };

    assert.equal(Compound.Iterable(trap), false);
    assert.equal(Compound.WellFormedIterator(trap), false);
  });
});

describe('>surface', () => {
  it('should expose every case', () => {
    assert.equal(Object.keys(Compound).length, cases.length);
  });
});
