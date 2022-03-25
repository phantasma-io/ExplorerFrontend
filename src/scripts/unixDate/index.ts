export const unixmsToDate = (ts: string) => {
  return new Date(parseInt(ts, 10) * 1000);
};
