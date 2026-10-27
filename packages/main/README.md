# @produck/argot

Organization-wide shared vocabulary for produck projects: common
helpers, units, and a symbol table.

It is meant to sit at the bottom of the stack: sibling packages and
applications import it so that a term means the same thing everywhere,
instead of every repository growing its own near-synonym.

## Install

```bash
npm install @produck/argot
```

## Usage

```js
import { Is, RTTF, SYMBOL, Unit, sleep } from '@produck/argot';

const parses = RTTF(JSON.parse);

parses('{}'); // true
parses('nope'); // false

await sleep(2 * Unit.Time.SEC);

const maxBody = 4 * Unit.Byte.MB; // 4194304

if (Is.PlainObject(payload) === false) {
  throw new TypeError('payload must be a plain object');
}

instance[SYMBOL.CONSTRUCTOR];
```

## Shape

A flat tail and eight namespaces:

| Path          | Contents                                             |
| ------------- | ---------------------------------------------------- |
| flat helpers  | `noop`, `passthrough`, `instanceOf`, `sleep`         |
| flat promises | `RTRF`, `ignoreRejection`                            |
| flat symbol   | `CONSTRUCTOR`                                        |
| flat asserts  | `AssertionChecker`, `ErrorMessage`, `ThrowTypeError` |
| `Boolean`     | `Adapter`                                            |
| `Constant`    | degenerate values                                    |
| `Intrinsic`   | constructors with no global name                     |
| `Is`          | `Primitive`, `Type`, `Instance`, `Compound`          |
| `Ow`          | the `@produck/ow` package                            |
| `Promise`     | `Adapter`, `sleep`                                   |
| `SYMBOL`      | the symbol table                                     |
| `Unit`        | `Time`, `Byte`                                       |

The flat names are not copies. Each one is the same object as its
namespaced form, so either path works:

```js
RTRF === Promise.Adapter.RTRF; // true
sleep === Promise.sleep; // true
CONSTRUCTOR === SYMBOL.CONSTRUCTOR; // true
```

## Flat helpers

### `noop()`

Returns `undefined` and ignores its arguments.

```js
noop(); // undefined
```

### `passthrough(any)`

Returns its argument unchanged.

```js
passthrough(1); // 1
```

### `instanceOf(object, constructor)`

Reports whether `object instanceof constructor`. Naming it as a
function keeps the check usable where an expression is expected;
`Is.Instance.Of` is built on it.

```js
instanceOf([], Array); // true
```

### `sleep(ms)`

Resolves `undefined` after `ms` milliseconds. `ms` must be a
non-negative integer; anything else throws `TypeError` synchronously.

```js
await sleep(120);
```

### `RTRF(promise)` / `ignoreRejection(promise)`

Described under [`Promise.Adapter`](#promiseadapter).

## `Boolean.Adapter`

A **factory** takes a function and returns a new function. The wrapped
failure becomes a value instead of propagating.

`fn` is validated synchronously, so a non-function throws `TypeError`
at wrap time rather than at the first call.

### `ThrowFalse(fn)`

Returns a function that forwards its arguments to `fn` and returns
whatever `fn` returns — or `false` when `fn` throws.

```js
const parse = ThrowFalse(JSON.parse);

parse('{}'); // {}
parse('nope'); // false
```

### `ReturnTrueThrowFalse(fn)` / `RTTF(fn)`

Reports only whether the call threw. The return value of `fn` is
discarded, so a falsy return still yields `true`.

```js
const parses = RTTF(JSON.parse);

parses('{}'); // true
parses('nope'); // false
```

## `Promise.Adapter`

Each helper collapses one side of the settlement. The argument is
validated with `instanceof Promise` before anything is attached, so a
non-promise throws `TypeError` synchronously — a `try`/`catch` around
the call always catches it.

### `ResolveTrueRejectFalse(promise)` / `RTRF(promise)`

Resolves `true` on resolve and `false` on reject. It never rejects.

```js
await RTRF(fetch('/api/v1/health')); // true
```

### `resolveTrue(promise)`

Resolves `true`; a rejection propagates unchanged.

```js
await resolveTrue(fetch('/api/v1/health')); // true
```

### `rejectFalse(promise)`

Passes the resolved value through, or resolves `false` on rejection.

```js
await rejectFalse(fetch('/api/v1/health')); // Response | false
```

### `ignoreResolution(promise)`

Resolves `undefined`; a rejection propagates unchanged.

```js
await ignoreResolution(fetch('/api/v1/health')); // undefined
```

### `ignoreRejection(promise)`

Passes the resolved value through, or resolves `undefined` on
rejection.

```js
await ignoreRejection(fetch('/api/v1/health'));
```

### `Promise.sleep(ms)`

The namespaced path to [`sleep`](#sleepms).

## `Constant`

### `alwaysUndefined()`

Alias of [`noop`](#noop), the same function object.

```js
alwaysUndefined(); // undefined
```

### `toTrue()` / `alwaysTrue()`

Returns `true`.

```js
toTrue(); // true
```

### `toFalse()` / `alwaysFalse()`

Returns `false`.

```js
toFalse(); // false
```

### `toNull()` / `alwaysNull()`

Returns `null`.

```js
toNull(); // null
```

### `Always(value)`

Builds a function that always yields `value`. Every call returns the
same reference.

```js
const answer = Always(42);

answer(); // 42
```

## `Is`

Four predicate sets, plus the `Compound` members repeated on `Is`
itself. A predicate takes one value and returns a `boolean`; it never
throws.

| Set         | Asks                                          |
| ----------- | --------------------------------------------- |
| `Primitive` | `typeof` on the primitive categories          |
| `Type`      | `Primitive`, plus `Function`                  |
| `Instance`  | `instanceof` against the builtin constructors |
| `Compound`  | several conditions at once                    |

### `Is.Primitive`

`Bigint`, `Boolean`, `Number`, `Object`, `String`, `Symbol`,
`Undefined` — each reads `typeof`.

Two consequences of reading `typeof` directly:

- `Is.Primitive.Object(null)` is `true`. This is not "is a plain
  object"; use [`Is.PlainObject`](#iscompound) for that.
- `Is.Primitive.Object(fn)` is `false`, because a function reads as
  `'function'`.

`Is.Primitive.Number(NaN)` is `true` — `typeof NaN` is `'number'`.

### `Is.Type`

The same seven readings, plus `Function`. It is `Primitive` widened by
one, not a different question.

### `Is.Instance`

One predicate per builtin constructor: `Array`, `Map`, `Set`, `Date`,
`RegExp`, `Error` and its subclasses, `ArrayBuffer` / `SharedArrayBuffer`
/ `DataView`, every typed array, `Promise`, `WeakMap` / `WeakSet` /
`WeakRef` / `FinalizationRegistry`, and the intrinsics
`GeneratorFunction`, `AsyncFunction`, `AsyncGeneratorFunction`,
`TypedArray`.

These are `instanceof` checks, which carries a trap: the boxed-primitive
constructors match only objects.

```js
Is.Instance.Number(1); // false
Is.Instance.Number(Object(1)); // true
```

The same holds for `BigInt`, `Boolean`, `String`, and `Symbol`. Use
`Is.Primitive` for the primitives themselves.

### `Is.Instance.Of(constructor)`

Builds a predicate from any constructor, so a check is available
without adding an entry here.

```js
const isUrl = Is.Instance.Of(URL);

isUrl(new URL('https://example.com')); // true
```

### `Is.Compound`

| Name                 | Passes when                                     |
| -------------------- | ----------------------------------------------- |
| `AsyncIterable`      | has a callable `Symbol.asyncIterator`           |
| `BuiltinIterator`    | inherits from `%IteratorPrototype%`             |
| `ErrorLike`          | has a string `message`                          |
| `Iterable`           | has a callable `Symbol.iterator`                |
| `Iterator`           | has a callable `next`                           |
| `NegativeInteger`    | integer below zero                              |
| `NegativeNumber`     | number below zero                               |
| `NonNegativeInteger` | integer of zero or above                        |
| `NonNegativeNumber`  | number of zero or above                         |
| `NonPositiveInteger` | integer of zero or below                        |
| `NonPositiveNumber`  | number of zero or below                         |
| `PlainObject`        | prototype is `Object.prototype` or `null`       |
| `PositiveInteger`    | integer above zero                              |
| `PositiveNumber`     | number above zero                               |
| `Thenable`           | has a callable `then`                           |
| `ValidDate`          | a `Date` whose `getTime()` is not `NaN`         |
| `WellFormedIterator` | `next`, plus `Symbol.iterator` returning itself |

The property probes read a slot, so `null` and `undefined` report
`false` rather than throwing.

On the numeric four: `NaN` fails them all, `Infinity` passes the
number checks and fails the integer ones.

The same seventeen names are exported on `Is` itself, so
`Is.PositiveInteger` and `Is.Compound.PositiveInteger` are the same
function.

## `Intrinsic`

The constructors that carry no global name, reached through the
prototype chain instead.

| Name                     | Is                         |
| ------------------------ | -------------------------- |
| `GeneratorFunction`      | `%GeneratorFunction%`      |
| `AsyncFunction`          | `%AsyncFunction%`          |
| `AsyncGeneratorFunction` | `%AsyncGeneratorFunction%` |
| `TypedArray`             | `%TypedArray%`             |
| `IteratorPrototype`      | `%IteratorPrototype%`      |

```js
Is.Instance.GeneratorFunction(function* () {}); // true
Is.Instance.GeneratorFunction(function () {}); // false
```

`TypedArray` is the abstract base shared by every typed array, so
`Is.Instance.TypedArray(new Float64Array())` is `true` while
`Is.Instance.TypedArray(new ArrayBuffer(8))` is `false`.

### `SYMBOL`

- `CONSTRUCTOR` — the instance slot standing in for the private
  `#constructor` field

### `Unit`

Agreed-on magnitudes, so that a bare number carries its unit in the
name. Each table is based on one unit, and every alias is exported
alongside its full name.

The base is stated per table rather than assumed: `Time` counts
milliseconds, `Byte` counts bytes in 1024 steps.

#### `Unit.Time`

Durations, counted in milliseconds: `MILLISECOND` is `1`, and every
unit is a whole multiple of the one below it.

| Full name     | Alias | Milliseconds |
| ------------- | ----- | ------------ |
| `MILLISECOND` | `MS`  | 1            |
| `SECOND`      | `SEC` | 1000         |
| `MINUTE`      | `MIN` | 60000        |
| `HOUR`        | `HR`  | 3600000      |
| `DAY`         | —     | 86400000     |
| `WEEK`        | `WK`  | 604800000    |

```js
await sleep(30 * Unit.Time.SEC);
```

Only fixed multiples are listed. A month and a year are not constants
— the calendar decides their length — so they are deliberately
absent. `DAY` carries no alias because its full name is already the
mainstream form.

#### `Unit.Byte`

Sizes, counted in bytes: `BYTE` is `1`, and every unit is `STEP`
times the one below it. The magnitude prefix is joined to `BYTE` by
`_`, so the unit word stays readable.

| Full name   | Alias | Bytes         |
| ----------- | ----- | ------------- |
| `BYTE`      | `B`   | 1             |
| `STEP`      | —     | 1024          |
| `KILO_BYTE` | `KB`  | 1024          |
| `MEGA_BYTE` | `MB`  | 1048576       |
| `GIGA_BYTE` | `GB`  | 1073741824    |
| `TERA_BYTE` | `TB`  | 1099511627776 |

`STEP` is `1 << 10`, the factor between adjacent units. It is exported
so that a caller can extend the ladder, or convert, without writing the
literal `1024` again.

```js
const maxBody = 4 * Unit.Byte.MB; // 4194304
```

The base is **1024, not 1000** — the familiar reading of `KB`, and what
Windows reports. That is deliberately not SI: SI reserves `kB` for
1000 and `KiB` for 1024. So `KILO_BYTE` here means 1024 bytes, always,
and the name alone cannot tell you that. Treat the table as the
definition.

### Re-exported dependencies

Two dependencies are re-exported from the top level of this package:

- `Ow` — the `@produck/ow` namespace, reached as `Ow.Thrower`,
  `Ow.throw`, `Ow.Error`.
- `@produck/type-error` — flat, not namespaced: `AssertionChecker`,
  `ErrorMessage`, `ThrowTypeError`, and the types `Assert` and
  `Validate`.

```js
import { AssertionChecker, Ow } from '@produck/argot';
```

## Naming convention

The verb encodes the input type:

| Verb                | Input                                         |
| ------------------- | --------------------------------------------- |
| `throw`             | a function, wrapped and invoked synchronously |
| `resolve`, `reject` | a promise                                     |

Taking a promise forces the result to be a promise, so the return type
is derivable from the input. No `Async` prefix is ever needed, and the
name never states the same thing twice.

Acronyms are the initials of the full name:

| Full name                | Alias  | Lives in          |
| ------------------------ | ------ | ----------------- |
| `ReturnTrueThrowFalse`   | `RTTF` | `Boolean.Adapter` |
| `ResolveTrueRejectFalse` | `RTRF` | `Promise.Adapter` |

`RTTF` reports a `boolean`; `RTRF` resolves one.

The two differ by one letter, and that letter is the modality marker:
`T` for throw, `R` for reject. Misreading one for the other fails
loudly, because the argument check throws `TypeError` — never silently.

Every alias is exported alongside its full name, so the acronym is an
entry point and never the only way in.

## Contract

- Symbols use `Symbol()`, not `Symbol.for()`. Identity is bound to the
  module instance, so exactly one copy of `@produck/argot` may exist in
  a process. With two copies the slot silently reads `undefined`.
- Symbols never leave the process: not in wire protocols, persisted
  config, or serialized payloads. `JSON.stringify` drops symbol-keyed
  slots without warning.
- Every helper is synchronous except `sleep` and the promise-taking
  ones. Argument checks throw before any promise is attached, so they
  are catchable at the call site.
- Predicates never throw: `null`, `undefined`, and primitives all get a
  `boolean` back.
- `sideEffects` is `false`, and every top-level statement only builds
  closures, constants, or symbols, so the package tree-shakes.

## Test

```bash
node test/index.mjs
```
