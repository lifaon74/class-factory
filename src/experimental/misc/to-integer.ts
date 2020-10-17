// https://tc39.es/ecma262/#sec-tointeger

export function ToInteger(value: any): number {
  value = Number(value);
  if (Number.isNaN(value)) {
    return 0;
  } else if (!Number.isFinite(value)) {
    return value;
  } else {
    return Math.sign(value) * Math.floor(Math.abs(value));
  }
}
