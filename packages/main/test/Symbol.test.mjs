import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as SYMBOL from '../src/Symbol.mjs';

describe('::CONSTRUCTOR', () => {
  it('should be a symbol', () => {
    assert.equal(typeof SYMBOL.CONSTRUCTOR, 'symbol');
  });

  it('should describe the private constructor slot', () => {
    assert.equal(SYMBOL.CONSTRUCTOR.description, '.#constructor');
  });
});
