const extractOptionalDecimals = (pattern: string): number => {
  const match = pattern.match(/\[(0+)]/);
  return match?.[1]?.length ?? 0;
};

export const numberFormat = (value: number | string, pattern = '0,0.[00000000]') => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return `${value}`;
  }

  const maximumFractionDigits = extractOptionalDecimals(pattern);

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(parsed);
};

export const stringCapitalize = (value: string, allWords = false) => {
  if (!value) {
    return '';
  }

  if (allWords) {
    return value
      .split(' ')
      .map((word) =>
        word.length > 0 ? `${word[0].toUpperCase()}${word.slice(1)}` : word,
      )
      .join(' ');
  }

  return `${value[0].toUpperCase()}${value.slice(1)}`;
};

export const stringTruncate = (
  value: string,
  length: number,
  keepLastWord = false,
) => {
  if (!value || value.length <= length) {
    return value;
  }

  if (keepLastWord) {
    const head = value.slice(0, length).trimEnd();
    const tail = value.slice(length).split(' ').pop();
    return `${head}...${tail ?? ''}`;
  }

  return `${value.slice(0, length)}...`;
};
