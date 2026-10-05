import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Byte from '../../src/Unit/Byte.mjs';

describe('::BYTE', () => {
  it('should be the base unit of 1', () => {
    assert.equal(Byte.BYTE, 1);
  });
});

describe('::B', () => {
  it('should be identical to BYTE', () => {
    assert.equal(Byte.B, Byte.BYTE);
  });
});

describe('::STEP', () => {
  it('should be 1024', () => {
    assert.equal(Byte.STEP, 1024);
  });
});

describe('::KILO_BYTE', () => {
  it('should be 1024 bytes', () => {
    assert.equal(Byte.KILO_BYTE, 1024);
  });
});

describe('::KB', () => {
  it('should be identical to KILO_BYTE', () => {
    assert.equal(Byte.KB, Byte.KILO_BYTE);
  });
});

describe('::MEGA_BYTE', () => {
  it('should be 1048576 bytes', () => {
    assert.equal(Byte.MEGA_BYTE, 1048576);
  });
});

describe('::MB', () => {
  it('should be identical to MEGA_BYTE', () => {
    assert.equal(Byte.MB, Byte.MEGA_BYTE);
  });
});

describe('::GIGA_BYTE', () => {
  it('should be 1073741824 bytes', () => {
    assert.equal(Byte.GIGA_BYTE, 1073741824);
  });
});

describe('::GB', () => {
  it('should be identical to GIGA_BYTE', () => {
    assert.equal(Byte.GB, Byte.GIGA_BYTE);
  });
});

describe('::TERA_BYTE', () => {
  it('should be 1099511627776 bytes', () => {
    assert.equal(Byte.TERA_BYTE, 1099511627776);
  });
});

describe('::TB', () => {
  it('should be identical to TERA_BYTE', () => {
    assert.equal(Byte.TB, Byte.TERA_BYTE);
  });
});
