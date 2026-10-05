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
import { Common, SYMBOL, Unit } from '@produck/argot';

const parses = Common.RTTF(JSON.parse);

parses('{}'); // true
parses('nope'); // false

await Common.RTRF(fetch('/api/v1/health')); // true when it succeeded

await Common.sleep(2 * Unit.Time.SEC);

const maxBody = 4 * Unit.Byte.MB; // 4194304

instance[SYMBOL.CONSTRUCTOR];
```

## API

### `Common`

Every argument is validated with `@produck/type-error`. A bad argument
throws `TypeError` **synchronously** — including for the promise-taking
helpers — so a `try`/`catch` around a call always catches it.

A **factory** takes a function and returns a new function. The wrapped
failure becomes a value instead of propagating.

**Degenerate values**

#### `noop()` / `toUndefined()`

Returns `undefined`. The two names are the same function.

```js
Common.noop(); // undefined
Common.toUndefined(); // undefined
```

#### `toTrue()`

Returns `true`.

```js
Common.toTrue(); // true
```

#### `toFalse()`

Returns `false`.

```js
Common.toFalse(); // false
```

#### `toNull()`

Returns `null`.

```js
Common.toNull(); // null
```

#### `passthrough(any)`

Returns its argument unchanged.

```js
Common.passthrough(1); // 1
```

**Timing**

#### `sleep(ms)`

Resolves with `undefined` after `ms` milliseconds, where `ms` is a
non-negative integer.

```js
await Common.sleep(120);
```

**Factories**

#### `ThrowFalse(fn)` — factory

Returns a function that forwards its arguments to `fn` and returns
whatever `fn` returns — or `false` when `fn` throws.

```js
const parse = Common.ThrowFalse(JSON.parse);

parse('{}'); // {}
parse('nope'); // false
```

#### `ReturnTrueThrowFalse(fn)` / `RTTF` — factory

Returns a function that forwards its arguments to `fn` and reports only
whether it threw. The return value of `fn` is discarded, so a falsy
return still yields `true`.

```js
const parses = Common.RTTF(JSON.parse);

parses('{}'); // true
parses('nope'); // false
```

**Promise-taking**

#### `ResolveTrueRejectFalse(promise)` / `RTRF`

Resolves `true` on resolve and `false` on reject. It never rejects.

```js
await Common.RTRF(fetch('/api/v1/health')); // true
```

#### `resolveTrue(promise)`

Resolves `true`; a rejection propagates unchanged.

```js
await Common.resolveTrue(fetch('/api/v1/health')); // true
```

#### `rejectFalse(promise)`

Passes the resolved value through, or resolves `false` on rejection.

```js
await Common.rejectFalse(fetch('/api/v1/health')); // Response | false
```

#### `ignoreResolution(promise)`

Resolves `undefined`; a rejection propagates unchanged.

```js
await Common.ignoreResolution(fetch('/api/v1/health')); // undefined
```

#### `ignoreRejection(promise)`

Passes the resolved value through, or resolves `undefined` on
rejection.

```js
await Common.ignoreRejection(fetch('/api/v1/health'));
```

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
await Common.sleep(30 * Unit.Time.SEC);
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

| Full name                | Alias  | Input    | Output                 |
| ------------------------ | ------ | -------- | ---------------------- |
| `ReturnTrueThrowFalse`   | `RTTF` | function | `(...args) => boolean` |
| `ResolveTrueRejectFalse` | `RTRF` | promise  | `Promise<boolean>`     |

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
  ones.

## Test

```bash
node test/index.mjs
```
