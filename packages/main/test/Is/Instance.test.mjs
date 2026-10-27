import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Instance from '../../src/Is/Instance.mjs';

const other = {};

const cases = [
  ['Object', {}, 1],
  ['Function', () => {}, other],
  ['GeneratorFunction', function* () {}, function () {}],
  ['AsyncFunction', async function () {}, function () {}],
  ['AsyncGeneratorFunction', async function* () {}, function* () {}],
  ['Boolean', Object(true), true],
  ['Symbol', Object(Symbol('s')), Symbol('s')],
  ['Number', Object(1), 1],
  ['BigInt', Object(1n), 1n],
  ['Array', [], other],
  ['Error', new Error('e'), other],
  ['EvalError', new EvalError('e'), other],
  ['RangeError', new RangeError('e'), other],
  ['ReferenceError', new ReferenceError('e'), other],
  ['SyntaxError', new SyntaxError('e'), other],
  ['TypeError', new TypeError('e'), other],
  ['URIError', new URIError('e'), other],
  ['AggregateError', new AggregateError([]), other],
  ['Date', new Date(), other],
  ['RegExp', /x/, other],
  ['Map', new Map(), other],
  ['Set', new Set(), other],
  ['WeakMap', new WeakMap(), other],
  ['WeakSet', new WeakSet(), other],
  ['WeakRef', new WeakRef(other), other],
  ['FinalizationRegistry', new FinalizationRegistry(() => {}), other],
  ['Promise', Promise.resolve(), other],
  ['ArrayBuffer', new ArrayBuffer(0), other],
  ['SharedArrayBuffer', new SharedArrayBuffer(0), other],
  ['DataView', new DataView(new ArrayBuffer(0)), other],
  ['TypedArray', new Uint8Array(), new ArrayBuffer(0)],
  ['Int8Array', new Int8Array(), other],
  ['Uint8Array', new Uint8Array(), other],
  ['Uint8ClampedArray', new Uint8ClampedArray(), other],
  ['Int16Array', new Int16Array(), other],
  ['Uint16Array', new Uint16Array(), other],
  ['Int32Array', new Int32Array(), other],
  ['Uint32Array', new Uint32Array(), other],
  ['Float16Array', new Float16Array(), other],
  ['Float32Array', new Float32Array(), other],
  ['Float64Array', new Float64Array(), other],
  ['BigInt64Array', new BigInt64Array(), other],
  ['BigUint64Array', new BigUint64Array(), other],
];

for (const [name, hit, miss] of cases) {
  describe(`::${name}()`, () => {
    it('should accept its own instance', () => {
      assert.equal(Instance[name](hit), true);
    });

    it('should reject a foreign value', () => {
      assert.equal(Instance[name](miss), false);
    });
  });
}

describe('::Of()', () => {
  it('should build a predicate from a constructor', () => {
    const isDate = Instance.Of(Date);

    assert.equal(isDate(new Date()), true);
    assert.equal(isDate({}), false);
  });
});

describe('>surface', () => {
  it('should expose every case plus Of', () => {
    assert.equal(Object.keys(Instance).length, cases.length + 1);
  });
});
