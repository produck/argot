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

await Common.RTRF(fetch('/api/v1/health')); // true when it succeeded

Common.RTTF(() => JSON.parse(input)); // true when input parses

await Common.sleep(120);

instance[SYMBOL.CONSTRUCTOR];
```

## API

### `Common`

Every argument is validated with `@produck/type-error`. A bad argument
throws `TypeError` **synchronously**, including for the promise-taking
helpers, so a `try`/`catch` around a call always catches it.

**Degenerate values**

- `noop()` returns `undefined`
- `toTrue()` returns `true`
- `toFalse()` returns `false`
- `toNull()` returns `null`
- `passthrough(any)` returns the argument, unchanged

**Timing**

- `sleep(ms)` resolves with `undefined` after `ms` milliseconds, where
  `ms` is a non-negative integer

**Function-taking**

- `throwFalse(fn)` returns whatever `fn()` returns, or `false` when it
  throws
- `ReturnTrueThrowFalse(fn)` / `RTTF` returns `true` when `fn()` returns
  and `false` when it throws. The return value of `fn` is discarded, so
  a falsy return still yields `true`.

**Promise-taking**

- `ResolveTrueRejectFalse(promise)` / `RTRF` resolves `true` or `false`.
  It never rejects.
- `resolveTrue(promise)` resolves `true`; a rejection propagates
  unchanged
- `rejectFalse(promise)` passes the resolved value through, or resolves
  `false` on rejection
- `ignoreResolution(promise)` resolves `undefined`; a rejection
  propagates unchanged
- `ignoreRejection(promise)` passes the resolved value through, or
  resolves `undefined` on rejection

### `SYMBOL`

- `CONSTRUCTOR` — the instance slot standing in for the private
  `#constructor` field

## Naming convention

The verb encodes the input type:

| Verb                | Input                             |
| ------------------- | --------------------------------- |
| `throw`             | a function, invoked synchronously |
| `resolve`, `reject` | a promise                         |

Taking a promise forces the result to be a promise, so the return type
is derivable from the input. No `Async` prefix is ever needed, and the
name never states the same thing twice.

Acronyms are the initials of the full name:

| Modality | Full name                | Alias  | Input    | Returns            |
| -------- | ------------------------ | ------ | -------- | ------------------ |
| sync     | `ReturnTrueThrowFalse`   | `RTTF` | function | `boolean`          |
| async    | `ResolveTrueRejectFalse` | `RTRF` | promise  | `Promise<boolean>` |

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
