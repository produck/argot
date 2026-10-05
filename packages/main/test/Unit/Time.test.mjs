import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import * as Time from '../../src/Unit/Time.mjs';

describe('::MILLISECOND', () => {
  it('should be the base unit of 1', () => {
    assert.equal(Time.MILLISECOND, 1);
  });
});

describe('::MS', () => {
  it('should be identical to MILLISECOND', () => {
    assert.equal(Time.MS, Time.MILLISECOND);
  });
});

describe('::SECOND', () => {
  it('should be 1000 milliseconds', () => {
    assert.equal(Time.SECOND, 1000);
  });
});

describe('::SEC', () => {
  it('should be identical to SECOND', () => {
    assert.equal(Time.SEC, Time.SECOND);
  });
});

describe('::MINUTE', () => {
  it('should be 60 seconds', () => {
    assert.equal(Time.MINUTE, 60000);
  });
});

describe('::MIN', () => {
  it('should be identical to MINUTE', () => {
    assert.equal(Time.MIN, Time.MINUTE);
  });
});

describe('::HOUR', () => {
  it('should be 60 minutes', () => {
    assert.equal(Time.HOUR, 3600000);
  });
});

describe('::HR', () => {
  it('should be identical to HOUR', () => {
    assert.equal(Time.HR, Time.HOUR);
  });
});

describe('::DAY', () => {
  it('should be 24 hours', () => {
    assert.equal(Time.DAY, 86400000);
  });
});

describe('::WEEK', () => {
  it('should be 7 days', () => {
    assert.equal(Time.WEEK, 604800000);
  });
});

describe('::WK', () => {
  it('should be identical to WEEK', () => {
    assert.equal(Time.WK, Time.WEEK);
  });
});
