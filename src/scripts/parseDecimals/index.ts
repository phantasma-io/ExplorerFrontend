export const parseDecimals = (amount: string, decimals: number) => {
  // TODO
  // if (Number.isNaN(parseInt(amount as string, 10))) {
  //   return `IT'S OVER 9000!`
  // }

  const formatStr = '0,0';
  const decimalsStr = `${10 ** (decimals || 0)}`;
  const parsedStr = `${formatStr}.${decimalsStr.substring(
    1,
    (decimals as number) + 1,
  )}`;

  return {
    number: parseInt(amount, 10) / 10 ** (decimals || 0),
    format: parsedStr,
  };
};
