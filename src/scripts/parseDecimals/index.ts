export const parseDecimals = (amount: string, decimals: number) => {
  const formatStr = '0,0';
  const decimalsStr = `${10 ** (decimals || 0)}`;
  const parsedStr = `${formatStr}.${decimalsStr.substring(
    1,
    (decimals as number) + 1,
  )}`;

  return {
    number: amount,
    format: amount,
    parsed: parseInt(amount, 10) / 10 ** decimals,
  };
};
