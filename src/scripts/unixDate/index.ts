export const unixToDate = (ts: string) => {
  const parsed = parseInt(ts, 10);
  if (Number.isNaN(parsed)) {
    return new Date(NaN);
  }
  return new Date(parsed * 1000);
};
