
export function ResolveArrayStartArgument(start: number | undefined, length: number): number {
  return (start === void 0)
    ? 0
    : (
      (start < 0)
        ? Math.max(0, length + start)
        : Math.min(length, start)
    );
}

export function ResolveArrayEndArgument(end: number | undefined, start: number, length: number): number {
  return (end === void 0)
    ? length
    : (
      Math.max(
        start,
        (end < 0)
          ? (length + end)
          : Math.min(length, end),
      )
    );
}
