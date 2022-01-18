import React from 'react';
import NextLink from 'next/link';
import { Typography, TypographyProps, Link as MuiLink } from '@mui/material';

/**
 * Link props
 */
export interface LinkProps extends TypographyProps {
  external?: boolean;
  href: string;
}

/**
 * Link
 */
export const Link = ({
  children,
  external,
  href,
  sx,
  ...propsTypo
}: LinkProps) => {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const linkComponent = (
    <MuiLink href={href} {...linkProps} sx={sx}>
      {children}
    </MuiLink>
  );
  if (external) {
    return <Typography {...propsTypo}>{linkComponent}</Typography>;
  }
  return (
    <Typography {...propsTypo}>
      <NextLink href={href} passHref>
        {linkComponent}
      </NextLink>
    </Typography>
  );
};
