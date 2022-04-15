export const parseIpfs = (link: string) => {
  if (link.includes('ipfs://')) {
    return {
      thumb: `https://cdn.ghostmarket.io/ext-full/${link
        .split('://')[1]
        .replace(/[/.?&=%]/g, '')}`,
      link: `https://cdn.ghostmarket.io/ext-full/${link
        .split('://')[1]
        .replace(/[/.?&=%]/g, '')}`,
    };
  }

  return {
    thumb: link,
    link,
  };
};
