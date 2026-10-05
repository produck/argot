/**
 * `@produck/argot` — the organization-wide shared vocabulary for
 * produck projects: common helpers, units, and a symbol table.
 *
 * Every entry validates its arguments with `@produck/type-error` and
 * throws `TypeError` synchronously on a bad argument — including the
 * promise-taking helpers. Wrapping a call in `try`/`catch` therefore
 * always catches a bad argument.
 */

/**
 * Common helpers.
 *
 * The verb in a name encodes the input type: `throw` takes a function
 * invoked synchronously, `resolve` and `reject` take a promise. Taking
 * a promise forces the result to be a promise, so no `Async` prefix is
 * needed.
 */
export namespace Common {
  /**
   * Does nothing.
   */
  export function noop(): undefined;

  /**
   * Always succeeds.
   */
  export function toTrue(): true;

  /**
   * Always fails.
   */
  export function toFalse(): false;

  /**
   * Stands in where an API demands a value but none is meaningful.
   */
  export function toNull(): null;

  /**
   * Identifies its argument.
   *
   * @param any - the value to hand back
   */
  export function passthrough<T>(any: T): T;

  /**
   * Waits before continuing.
   *
   * @param ms - the delay in milliseconds; a non-negative integer
   */
  export function sleep(ms: number): Promise<undefined>;

  /**
   * Wraps `fn` so that a thrown error becomes `false`.
   *
   * @param fn - the function to wrap
   * @returns a function forwarding its arguments to `fn`, returning
   *   whatever `fn` returns — or `false` when `fn` throws
   * @example
   * ```js
   * const parse = Common.ThrowFalse(JSON.parse);
   *
   * parse('{}'); // {}
   * parse('nope'); // false
   * ```
   */
  export function ThrowFalse<A extends unknown[], R>(
    fn: (...args: A) => R,
  ): (...args: A) => R | false;

  /**
   * Wraps `fn` so that a call reports only whether it threw.
   *
   * The return value of `fn` is discarded: a falsy return still yields
   * `true`.
   *
   * @param fn - the function to wrap
   * @returns a function forwarding its arguments to `fn`, returning
   *   `true` when `fn` returns and `false` when it throws
   * @example
   * ```js
   * const parses = Common.RTTF(JSON.parse);
   *
   * parses('{}'); // true
   * parses('nope'); // false
   * ```
   */
  export function ReturnTrueThrowFalse<A extends unknown[]>(
    fn: (...args: A) => unknown,
  ): (...args: A) => boolean;

  /**
   * Reports whether a promise resolves or rejects.
   *
   * @param promise - the promise to observe
   * @returns `true` on resolve, `false` on reject; never rejects
   * @example
   * ```js
   * await Common.RTRF(fetch('/api/v1/health'));
   * ```
   */
  export function ResolveTrueRejectFalse(
    promise: Promise<unknown>,
  ): Promise<boolean>;

  /**
   * Observes a promise, forwarding only its success.
   *
   * @param promise - the promise to observe
   * @returns `true` on resolve; a rejection propagates unchanged
   */
  export function resolveTrue(promise: Promise<unknown>): Promise<true>;

  /**
   * Observes a promise, collapsing only its failure.
   *
   * @param promise - the promise to observe
   * @returns the resolved value, or `false` on reject
   */
  export function rejectFalse<T>(promise: Promise<T>): Promise<T | false>;

  /**
   * Observes a promise, forwarding only its failure.
   *
   * @param promise - the promise to observe
   * @returns `undefined` on resolve; a rejection propagates unchanged
   */
  export function ignoreResolution(
    promise: Promise<unknown>,
  ): Promise<undefined>;

  /**
   * Observes a promise, collapsing only its success.
   *
   * @param promise - the promise to observe
   * @returns the resolved value, or `undefined` on reject
   */
  export function ignoreRejection<T>(
    promise: Promise<T>,
  ): Promise<T | undefined>;

  /**
   * Alias of {@link ReturnTrueThrowFalse}.
   */
  export const RTTF: typeof ReturnTrueThrowFalse;

  /**
   * Alias of {@link ResolveTrueRejectFalse}.
   */
  export const RTRF: typeof ResolveTrueRejectFalse;

  /**
   * Alias of {@link noop}.
   */
  export const toUndefined: typeof noop;
}

/**
 * The symbol table: agreed-upon names for non-public instance slots, so
 * that packages can interoperate on internals without exposing them.
 *
 * These are created with `Symbol()`, not `Symbol.for()`, so exactly one
 * copy of this package may exist in a process.
 */
export namespace SYMBOL {
  /**
   * The instance slot standing in for the private `#constructor`
   * field.
   */
  export const CONSTRUCTOR: symbol;
}

/**
 * Agreed-on magnitudes, so that a bare number carries its unit in the
 * name. Each table is based on one unit.
 */
export namespace Unit {
  /**
   * Durations, counted in milliseconds.
   *
   * Every unit is a whole multiple of the one below it. A month and a
   * year are absent: the calendar, not the clock, decides their
   * length, so neither is a constant.
   */
  export namespace Time {
    /**
     * The base unit: `1` millisecond.
     */
    export const MILLISECOND: 1;

    /**
     * Alias of {@link MILLISECOND}.
     */
    export const MS: typeof MILLISECOND;

    /**
     * `1000` milliseconds.
     */
    export const SECOND: 1000;

    /**
     * Alias of {@link SECOND}.
     */
    export const SEC: typeof SECOND;

    /**
     * `60` seconds.
     */
    export const MINUTE: 60000;

    /**
     * Alias of {@link MINUTE}.
     */
    export const MIN: typeof MINUTE;

    /**
     * `60` minutes.
     */
    export const HOUR: 3600000;

    /**
     * Alias of {@link HOUR}.
     */
    export const HR: typeof HOUR;

    /**
     * `24` hours. Not aliased: the full name is already the mainstream
     * form.
     */
    export const DAY: 86400000;

    /**
     * `7` days.
     */
    export const WEEK: 604800000;

    /**
     * Alias of {@link WEEK}.
     */
    export const WK: typeof WEEK;
  }

  /**
   * Sizes, counted in bytes.
   *
   * The base is **1024, not 1000** — the familiar reading of `KB`,
   * and what Windows reports. This is deliberately not SI: SI reserves
   * `kB` for 1000 and `KiB` for 1024. So `KILO_BYTE` here means 1024
   * bytes, always.
   */
  export namespace Byte {
    /**
     * The base unit: `1` byte.
     */
    export const BYTE: 1;

    /**
     * Alias of {@link BYTE}.
     */
    export const B: typeof BYTE;

    /**
     * The factor between adjacent units: `1 << 10`, i.e. `1024`.
     */
    export const STEP: 1024;

    /**
     * `1024` bytes.
     */
    export const KILO_BYTE: 1024;

    /**
     * Alias of {@link KILO_BYTE}.
     */
    export const KB: typeof KILO_BYTE;

    /**
     * `1024` kilobytes, i.e. `1048576` bytes.
     */
    export const MEGA_BYTE: 1048576;

    /**
     * Alias of {@link MEGA_BYTE}.
     */
    export const MB: typeof MEGA_BYTE;

    /**
     * `1024` megabytes, i.e. `1073741824` bytes.
     */
    export const GIGA_BYTE: 1073741824;

    /**
     * Alias of {@link GIGA_BYTE}.
     */
    export const GB: typeof GIGA_BYTE;

    /**
     * `1024` gigabytes, i.e. `1099511627776` bytes.
     */
    export const TERA_BYTE: 1099511627776;

    /**
     * Alias of {@link TERA_BYTE}.
     */
    export const TB: typeof TERA_BYTE;
  }
}

/**
 * `@produck/ow`, re-exported as a namespace.
 */
export * as Ow from '@produck/ow';

/**
 * `@produck/type-error`, re-exported flat so that its assertion helpers
 * are reachable at the top level of this package.
 */
export * from '@produck/type-error';
