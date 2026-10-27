/**
 * `@produck/argot` — the organization-wide shared vocabulary for
 * produck projects: common helpers, units, and a symbol table.
 *
 * Every entry validates its arguments with `@produck/type-error` and
 * throws `TypeError` synchronously on a bad argument — including the
 * promise-taking helpers. Wrapping a call in `try`/`catch` therefore
 * always catches a bad argument.
 *
 * The common helpers are exported flat, at the top level, so that one
 * import is enough. `@produck/type-error` is re-exported whole and
 * `@produck/ow` as the `Ow` namespace, so their members arrive too.
 */

/**
 * The host `Promise`, kept nameable while this module also exports a
 * namespace called `Promise`.
 */
type NativePromise<T> = globalThis.Promise<T>;

/**
 * Any constructor usable as the right-hand side of `instanceof`.
 */
type IntrinsicConstructor = abstract new (...args: never[]) => unknown;

/**
 * A predicate: reports whether a value matches, never throws.
 */
type Predicate = (value: unknown) => boolean;

/** The instance slot standing in for the private `#constructor`. */
export const CONSTRUCTOR: typeof SYMBOL.CONSTRUCTOR;

/** Does nothing. */
export function noop(): undefined;

/** Identifies its argument. */
export function passthrough<T>(any: T): T;

/** Reports whether `object` is an instance of `constructor`. */
export function instanceOf(
  object: unknown,
  constructor: IntrinsicConstructor,
): boolean;

/** Waits before continuing; `ms` is a non-negative integer. */
export const sleep: typeof Promise.sleep;

/** Reports whether a promise resolves or rejects; never rejects. */
export const RTRF: typeof Promise.Adapter.RTRF;

/** Collapses only the failure of a promise. */
export const ignoreRejection: typeof Promise.Adapter.ignoreRejection;

/**
 * Boolean adapters: a thrown error becomes a `false` value instead of
 * propagating.
 */
export namespace Boolean {
  /** The adapters themselves. */
  export namespace Adapter {
    /** Wraps `fn` so that a thrown error becomes `false`. */
    export function ThrowFalse<A extends unknown[], R>(
      fn: (...args: A) => R,
    ): (...args: A) => R | false;

    /** Wraps `fn` so that a call reports only whether it threw. */
    export function ReturnTrueThrowFalse<A extends unknown[]>(
      fn: (...args: A) => unknown,
    ): (...args: A) => boolean;

    /** Alias of {@link ReturnTrueThrowFalse}. */
    export const RTTF: typeof ReturnTrueThrowFalse;
  }
}

/**
 * Degenerate values, and the factory that builds more of them.
 */
export namespace Constant {
  /** Always yields `undefined`. */
  export const alwaysUndefined: () => undefined;

  /** Always succeeds. */
  export const toTrue: () => true;

  /** Always fails. */
  export const toFalse: () => false;

  /** Stands in where an API demands a value but none is meaningful. */
  export const toNull: () => null;

  /** Alias of {@link toTrue}. */
  export const alwaysTrue: typeof toTrue;

  /** Alias of {@link toFalse}. */
  export const alwaysFalse: typeof toFalse;

  /** Alias of {@link toNull}. */
  export const alwaysNull: typeof toNull;

  /** Builds a function that always yields `value`. */
  export function Always<T>(value: T): () => T;
}

/**
 * The intrinsic constructors that carry no global name, reached through
 * the prototype chain instead.
 */
export namespace Intrinsic {
  /** `%GeneratorFunction%`. */
  export const GeneratorFunction: IntrinsicConstructor;

  /** `%AsyncFunction%`. */
  export const AsyncFunction: IntrinsicConstructor;

  /** `%AsyncGeneratorFunction%`. */
  export const AsyncGeneratorFunction: IntrinsicConstructor;

  /** `%TypedArray%`, the abstract base of every typed array. */
  export const TypedArray: IntrinsicConstructor;

  /** `%IteratorPrototype%`. */
  export const IteratorPrototype: object;
}

/**
 * Predicate sets. `Primitive` and `Type` ask `typeof`; `Instance` asks
 * `instanceof`; `Compound` combines several conditions. The `Compound`
 * members are repeated on `Is` itself, so `Is.PositiveInteger` works as
 * well as `Is.Compound.PositiveInteger`.
 */
export namespace Is {
  /** `typeof` checks on the primitive categories. */
  export namespace Primitive {
    /** Reads `typeof` as `'bigint'`. */
    export const Bigint: Predicate;

    /** Reads `typeof` as `'boolean'`. */
    export const Boolean: Predicate;

    /** Reads `typeof` as `'number'`; `NaN` passes. */
    export const Number: Predicate;

    /**
     * Reads `typeof` as `'object'`. `null` passes and a function
     * fails, so this is not "is a plain object".
     */
    export const Object: Predicate;

    /** Reads `typeof` as `'string'`. */
    export const String: Predicate;

    /** Reads `typeof` as `'symbol'`. */
    export const Symbol: Predicate;

    /** Reads `typeof` as `'undefined'`. */
    export const Undefined: Predicate;
  }

  /** `typeof` checks, with `Function` on top of the primitives. */
  export namespace Type {
    /** Reads `typeof` as `'bigint'`. */
    export const Bigint: Predicate;

    /** Reads `typeof` as `'boolean'`. */
    export const Boolean: Predicate;

    /** Reads `typeof` as `'function'`; classes pass too. */
    export const Function: Predicate;

    /** Reads `typeof` as `'number'`; `NaN` passes. */
    export const Number: Predicate;

    /**
     * Reads `typeof` as `'object'`. `null` passes and a function
     * fails.
     */
    export const Object: Predicate;

    /** Reads `typeof` as `'string'`. */
    export const String: Predicate;

    /** Reads `typeof` as `'symbol'`. */
    export const Symbol: Predicate;

    /** Reads `typeof` as `'undefined'`. */
    export const Undefined: Predicate;
  }

  /** `instanceof` checks against the builtin constructors. */
  export namespace Instance {
    /** Tests against `AggregateError`. */
    export const AggregateError: Predicate;

    /** Tests against `Array`. */
    export const Array: Predicate;

    /** Tests against `ArrayBuffer`. */
    export const ArrayBuffer: Predicate;

    /** Tests against `%AsyncFunction%`; a plain function fails. */
    export const AsyncFunction: Predicate;

    /** Tests against `%AsyncGeneratorFunction%`. */
    export const AsyncGeneratorFunction: Predicate;

    /**
     * Tests against `BigInt`. Only a boxed `Object(1n)` passes; the
     * `1n` primitive does not.
     */
    export const BigInt: Predicate;

    /** Tests against `BigInt64Array`. */
    export const BigInt64Array: Predicate;

    /** Tests against `BigUint64Array`. */
    export const BigUint64Array: Predicate;

    /**
     * Tests against `Boolean`. Only a boxed `Object(true)` passes; the
     * `true` primitive does not.
     */
    export const Boolean: Predicate;

    /** Tests against `DataView`. */
    export const DataView: Predicate;

    /** Tests against `Date`. */
    export const Date: Predicate;

    /** Tests against `Error`, so every subclass passes. */
    export const Error: Predicate;

    /** Tests against `EvalError`. */
    export const EvalError: Predicate;

    /** Tests against `FinalizationRegistry`. */
    export const FinalizationRegistry: Predicate;

    /** Tests against `Float16Array`. */
    export const Float16Array: Predicate;

    /** Tests against `Float32Array`. */
    export const Float32Array: Predicate;

    /** Tests against `Float64Array`. */
    export const Float64Array: Predicate;

    /** Tests against `Function`; classes and async ones pass. */
    export const Function: Predicate;

    /** Tests against `%GeneratorFunction%`. */
    export const GeneratorFunction: Predicate;

    /** Tests against `Int8Array`. */
    export const Int8Array: Predicate;

    /** Tests against `Int16Array`. */
    export const Int16Array: Predicate;

    /** Tests against `Int32Array`. */
    export const Int32Array: Predicate;

    /** Tests against `Map`. */
    export const Map: Predicate;

    /**
     * Tests against `Number`. Only a boxed `Object(1)` passes; the `1`
     * primitive does not.
     */
    export const Number: Predicate;

    /** Tests against `Object`; `null` fails and a function passes. */
    export const Object: Predicate;

    /** Tests against `Promise`. */
    export const Promise: Predicate;

    /** Tests against `RangeError`. */
    export const RangeError: Predicate;

    /** Tests against `ReferenceError`. */
    export const ReferenceError: Predicate;

    /** Tests against `RegExp`. */
    export const RegExp: Predicate;

    /** Tests against `Set`. */
    export const Set: Predicate;

    /** Tests against `SharedArrayBuffer`. */
    export const SharedArrayBuffer: Predicate;

    /** Tests against `SyntaxError`. */
    export const SyntaxError: Predicate;

    /**
     * Tests against `Symbol`. Only a boxed `Object(sym)` passes; a
     * symbol primitive does not.
     */
    export const Symbol: Predicate;

    /** Tests against `TypeError`. */
    export const TypeError: Predicate;

    /** Tests against `%TypedArray%`, matching every typed array. */
    export const TypedArray: Predicate;

    /** Tests against `URIError`. */
    export const URIError: Predicate;

    /** Tests against `Uint8Array`. */
    export const Uint8Array: Predicate;

    /** Tests against `Uint8ClampedArray`. */
    export const Uint8ClampedArray: Predicate;

    /** Tests against `Uint16Array`. */
    export const Uint16Array: Predicate;

    /** Tests against `Uint32Array`. */
    export const Uint32Array: Predicate;

    /** Tests against `WeakMap`. */
    export const WeakMap: Predicate;

    /** Tests against `WeakRef`. */
    export const WeakRef: Predicate;

    /** Tests against `WeakSet`. */
    export const WeakSet: Predicate;

    /** Builds a predicate from any constructor. */
    export function Of(constructor: IntrinsicConstructor): Predicate;
  }

  /** Checks that combine several conditions. */
  export namespace Compound {
    /** Exposes a callable `Symbol.asyncIterator`. */
    export const AsyncIterable: Predicate;

    /** Inherits from `%IteratorPrototype%`. */
    export const BuiltinIterator: Predicate;

    /** Exposes a string `message`. */
    export const ErrorLike: Predicate;

    /** Exposes a callable `Symbol.iterator`. */
    export const Iterable: Predicate;

    /** Exposes a callable `next`. */
    export const Iterator: Predicate;

    /** Is an integer below zero. */
    export const NegativeInteger: Predicate;

    /** Is a number below zero. */
    export const NegativeNumber: Predicate;

    /** Is an integer of zero or above. */
    export const NonNegativeInteger: Predicate;

    /** Is a number of zero or above. */
    export const NonNegativeNumber: Predicate;

    /** Is an integer of zero or below. */
    export const NonPositiveInteger: Predicate;

    /** Is a number of zero or below. */
    export const NonPositiveNumber: Predicate;

    /** Is an object whose prototype is `Object.prototype` or `null`. */
    export const PlainObject: Predicate;

    /** Is an integer above zero. */
    export const PositiveInteger: Predicate;

    /** Is a number above zero. */
    export const PositiveNumber: Predicate;

    /** Exposes a callable `then`. */
    export const Thenable: Predicate;

    /** Is a `Date` holding a real time, not `NaN`. */
    export const ValidDate: Predicate;

    /** Is an iterator whose `Symbol.iterator` returns itself. */
    export const WellFormedIterator: Predicate;
  }

  /** Alias of {@link Compound.AsyncIterable}. */
  export const AsyncIterable: typeof Compound.AsyncIterable;

  /** Alias of {@link Compound.BuiltinIterator}. */
  export const BuiltinIterator: typeof Compound.BuiltinIterator;

  /** Alias of {@link Compound.ErrorLike}. */
  export const ErrorLike: typeof Compound.ErrorLike;

  /** Alias of {@link Compound.Iterable}. */
  export const Iterable: typeof Compound.Iterable;

  /** Alias of {@link Compound.Iterator}. */
  export const Iterator: typeof Compound.Iterator;

  /** Alias of {@link Compound.NegativeInteger}. */
  export const NegativeInteger: typeof Compound.NegativeInteger;

  /** Alias of {@link Compound.NegativeNumber}. */
  export const NegativeNumber: typeof Compound.NegativeNumber;

  /** Alias of {@link Compound.NonNegativeInteger}. */
  export const NonNegativeInteger: typeof Compound.NonNegativeInteger;

  /** Alias of {@link Compound.NonNegativeNumber}. */
  export const NonNegativeNumber: typeof Compound.NonNegativeNumber;

  /** Alias of {@link Compound.NonPositiveInteger}. */
  export const NonPositiveInteger: typeof Compound.NonPositiveInteger;

  /** Alias of {@link Compound.NonPositiveNumber}. */
  export const NonPositiveNumber: typeof Compound.NonPositiveNumber;

  /** Alias of {@link Compound.PlainObject}. */
  export const PlainObject: typeof Compound.PlainObject;

  /** Alias of {@link Compound.PositiveInteger}. */
  export const PositiveInteger: typeof Compound.PositiveInteger;

  /** Alias of {@link Compound.PositiveNumber}. */
  export const PositiveNumber: typeof Compound.PositiveNumber;

  /** Alias of {@link Compound.Thenable}. */
  export const Thenable: typeof Compound.Thenable;

  /** Alias of {@link Compound.ValidDate}. */
  export const ValidDate: typeof Compound.ValidDate;

  /** Alias of {@link Compound.WellFormedIterator}. */
  export const WellFormedIterator: typeof Compound.WellFormedIterator;
}

/**
 * Promise helpers. Each collapses one side of the settlement.
 */
export namespace Promise {
  /** The helpers themselves. */
  export namespace Adapter {
    /** Reports whether a promise resolves or rejects. */
    export function ResolveTrueRejectFalse(
      promise: NativePromise<unknown>,
    ): NativePromise<boolean>;

    /** Resolves `true`; a rejection propagates unchanged. */
    export function resolveTrue(
      promise: NativePromise<unknown>,
    ): NativePromise<true>;

    /** Passes the resolved value through, or resolves `false`. */
    export function rejectFalse<T>(
      promise: NativePromise<T>,
    ): NativePromise<T | false>;

    /** Resolves `undefined`; a rejection propagates unchanged. */
    export function ignoreResolution(
      promise: NativePromise<unknown>,
    ): NativePromise<undefined>;

    /** Passes the resolved value through, or resolves `undefined`. */
    export function ignoreRejection<T>(
      promise: NativePromise<T>,
    ): NativePromise<T | undefined>;

    /** Alias of {@link ResolveTrueRejectFalse}. */
    export const RTRF: typeof ResolveTrueRejectFalse;
  }

  /** Waits before continuing; `ms` is a non-negative integer. */
  export function sleep(ms: number): NativePromise<undefined>;
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
