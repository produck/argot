import * as Intrinsic from '../Intrinsic.mjs';
import { instanceOf } from '../Top.mjs';

function Factory(constructor) {
  return (object) => instanceOf(object, constructor);
}

const isObject = Factory(Object);
const isFunction = Factory(Function);
const isGeneratorFunction = Factory(Intrinsic.GeneratorFunction);
const isAsyncFunction = Factory(Intrinsic.AsyncFunction);
const isAsyncGeneratorFunction = Factory(Intrinsic.AsyncGeneratorFunction);
const isBoolean = Factory(Boolean);
const isSymbol = Factory(Symbol);
const isNumber = Factory(Number);
const isBigInt = Factory(BigInt);
const isArray = Factory(Array);

const isError = Factory(Error);
const isEvalError = Factory(EvalError);
const isRangeError = Factory(RangeError);
const isReferenceError = Factory(ReferenceError);
const isSyntaxError = Factory(SyntaxError);
const isTypeError = Factory(TypeError);
const isURIError = Factory(URIError);
const isAggregateError = Factory(AggregateError);

const isDate = Factory(Date);
const isRegExp = Factory(RegExp);

const isMap = Factory(Map);
const isSet = Factory(Set);
const isWeakMap = Factory(WeakMap);
const isWeakSet = Factory(WeakSet);
const isWeakRef = Factory(WeakRef);
const isFinalizationRegistry = Factory(FinalizationRegistry);

const isPromise = Factory(Promise);

const isArrayBuffer = Factory(ArrayBuffer);
const isSharedArrayBuffer = Factory(SharedArrayBuffer);
const isDataView = Factory(DataView);
const isTypedArray = Factory(Intrinsic.TypedArray);

const isInt8Array = Factory(Int8Array);
const isUint8Array = Factory(Uint8Array);
const isUint8ClampedArray = Factory(Uint8ClampedArray);
const isInt16Array = Factory(Int16Array);
const isUint16Array = Factory(Uint16Array);
const isInt32Array = Factory(Int32Array);
const isUint32Array = Factory(Uint32Array);
const isFloat16Array = Factory(Float16Array);
const isFloat32Array = Factory(Float32Array);
const isFloat64Array = Factory(Float64Array);
const isBigInt64Array = Factory(BigInt64Array);
const isBigUint64Array = Factory(BigUint64Array);

export {
  isObject as Object,
  isFunction as Function,
  isGeneratorFunction as GeneratorFunction,
  isAsyncFunction as AsyncFunction,
  isAsyncGeneratorFunction as AsyncGeneratorFunction,
  isBoolean as Boolean,
  isSymbol as Symbol,
  isNumber as Number,
  isBigInt as BigInt,
  isArray as Array,
  isError as Error,
  isEvalError as EvalError,
  isRangeError as RangeError,
  isReferenceError as ReferenceError,
  isSyntaxError as SyntaxError,
  isTypeError as TypeError,
  isURIError as URIError,
  isAggregateError as AggregateError,
  isDate as Date,
  isRegExp as RegExp,
  isMap as Map,
  isSet as Set,
  isWeakMap as WeakMap,
  isWeakSet as WeakSet,
  isWeakRef as WeakRef,
  isFinalizationRegistry as FinalizationRegistry,
  isPromise as Promise,
  isArrayBuffer as ArrayBuffer,
  isSharedArrayBuffer as SharedArrayBuffer,
  isDataView as DataView,
  isTypedArray as TypedArray,
  isInt8Array as Int8Array,
  isUint8Array as Uint8Array,
  isUint8ClampedArray as Uint8ClampedArray,
  isInt16Array as Int16Array,
  isUint16Array as Uint16Array,
  isInt32Array as Int32Array,
  isUint32Array as Uint32Array,
  isFloat16Array as Float16Array,
  isFloat32Array as Float32Array,
  isFloat64Array as Float64Array,
  isBigInt64Array as BigInt64Array,
  isBigUint64Array as BigUint64Array,
  Factory as Of,
};
