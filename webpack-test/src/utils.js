/**
 *
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} a + b
 */
export function add(a, b) {
  return a + b;
}

export function getFeatureFlag(flag) {
  const value = window.localStorage(flag);
  return value ?? "default";
}
