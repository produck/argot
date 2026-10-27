export const GeneratorFunction = Object.getPrototypeOf(
  function* () {},
).constructor;

export const AsyncFunction = Object.getPrototypeOf(
  async function () {},
).constructor;

export const AsyncGeneratorFunction = Object.getPrototypeOf(
  async function* () {},
).constructor;

export const TypedArray = Object.getPrototypeOf(Int8Array);

export const IteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf([][Symbol.iterator]()),
);
