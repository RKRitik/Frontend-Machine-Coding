export function isNull(value: unknown): value is null {
  if (value === null) return true;
  return false;
}
