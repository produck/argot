# @produck/argot

Organization-wide shared vocabulary for produck projects: common
helpers and a symbol table.

It is meant to sit at the bottom of the stack: sibling packages and
applications import it so that a term means the same thing everywhere,
instead of every repository growing its own near-synonym.

## Install

```bash
npm install @produck/argot
```

## Usage

```js
import { Common, SYMBOL } from '@produck/argot';

const parses = Common.RTTF(JSON.parse);

parses('{}'); // true
parses('nope'); // false

await Common.RTRF(fetch('/api/v1/health')); // true when it succeeded

await Common.sleep(120);

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

#### `noop()`

Returns `undefined`.

```js
Common.noop(); // undefined
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
