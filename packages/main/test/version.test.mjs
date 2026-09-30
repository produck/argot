import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import packageJson from '../package.json' with { type: 'json' };
import { VERSION } from '../src/index.mjs';

describe('::VERSION', () => {
  it('should be a semver string', () => {
    assert.match(VERSION, /^\d+\.\d+\.\d+$/);
  });

  it('should match the package.json version', () => {
    assert.equal(VERSION, packageJson.version);
  });
});
