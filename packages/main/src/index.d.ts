/**
 * `@produck/argot` — the organization-wide shared vocabulary for
 * produck projects: common helpers and a symbol table.
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
