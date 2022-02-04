// src/util.ts
var clamp = (v, min = 0, max = 1) => {
  if (Number.isNaN(v))
    throw new Error(`v parameter is NaN`);
  if (Number.isNaN(min))
    throw new Error(`min parameter is NaN`);
  if (Number.isNaN(max))
    throw new Error(`max parameter is NaN`);
  if (v < min)
    return min;
  if (v > max)
    return max;
  return v;
};
var clampZeroBounds = (v, length) => {
  if (!Number.isInteger(v))
    throw new Error(`v parameter must be an integer (${v})`);
  if (!Number.isInteger(length))
    throw new Error(`length parameter must be an integer (${length}, ${typeof length})`);
  v = Math.round(v);
  if (v < 0)
    return 0;
  if (v >= length)
    return length - 1;
  return v;
};
var lerp = (amt, a, b) => (1 - amt) * a + amt * b;
var sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
var delay = async (call, milliseconds) => {
  await sleep(milliseconds);
  return Promise.resolve(await call());
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b)
    return true;
  return toStringDefault(a) === toStringDefault(b);
};
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);

export {
  clamp,
  clampZeroBounds,
  lerp,
  sleep,
  delay,
  isEqualDefault,
  isEqualValueDefault,
  toStringDefault
};
//# sourceMappingURL=chunk-CX6IPGLD.js.map