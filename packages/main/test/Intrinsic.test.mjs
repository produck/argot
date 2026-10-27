import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Intrinsic from '../src/Intrinsic.mjs';

const generator = function* () {};
const asyncFunction = async function () {};
const asyncGenerator = async function* () {};
const plainFunction = function () {};

describe('::GeneratorFunction', () => {
  it('should match a generator function only', () => {
    assert.equal(generator instanceof Intrinsic.GeneratorFunction, true);
    assert.equal(plainFunction instanceof Intrinsic.GeneratorFunction, false);
  });
});

describe('::AsyncFunction', () => {
  it('should match an async function only', () => {
    assert.equal(asyncFunction instanceof Intrinsic.AsyncFunction, true);
    assert.equal(plainFunction instanceof Intrinsic.AsyncFunction, false);
  });
});

describe('::AsyncGeneratorFunction', () => {
  it('should match an async generator only', () => {
    assert.equal(
      asyncGenerator instanceof Intrinsic.AsyncGeneratorFunction,
      true,
    );
    assert.equal(generator instanceof Intrinsic.AsyncGeneratorFunction, false);
  });
});

describe('::TypedArray', () => {
  it('should match every typed array', () => {
    assert.equal(new Uint8Array() instanceof Intrinsic.TypedArray, true);
    assert.equal(new Float64Array() instanceof Intrinsic.TypedArray, true);
    assert.equal(new ArrayBuffer(0) instanceof Intrinsic.TypedArray, false);
  });
});

describe('::IteratorPrototype', () => {
  it('should be the ancestor of builtin iterators', () => {
    const { isPrototypeOf } = Object.prototype;

    assert.equal(
      isPrototypeOf.call(Intrinsic.IteratorPrototype, [][Symbol.iterator]()),
      true,
    );
    assert.equal(
      isPrototypeOf.call(Intrinsic.IteratorPrototype, new Map().keys()),
      true,
    );
    assert.equal(isPrototypeOf.call(Intrinsic.IteratorPrototype, {}), false);
  });
});
