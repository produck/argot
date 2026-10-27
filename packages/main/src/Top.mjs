export const noop = () => {};

export const passthrough = (any) => any;

export function instanceOf(object, constructor) {
  return object instanceof constructor;
}
