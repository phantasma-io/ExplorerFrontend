import React from 'react';
import NextLink from 'next/link';
import { Typography, TypographyProps, Link as MuiLink } from '@mui/material';

/**
 * Link props
 */
export interface LinkProps extends TypographyProps {
  external?: boolean;
  href: string;
  withDec?: boolean;
}

/**
 * Link
 */
export const Link = ({
  children,
  external,
  href,
  sx,
  withDec,
  ...propsTypo
}: LinkProps) => {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const linkComponent = (
    <MuiLink
      href={href}
      {...linkProps}
      sx={{ textDecoration: withDec ? 'underline' : 'none', ...sx }}
    >
      {children}
    </MuiLink>
  );
  if (external) {
    return (
      <Typography {...propsTypo} sx={sx}>
        {linkComponent}
      </Typography>
    );
  }
  return (
    <Typography {...propsTypo} sx={sx}>
      <NextLink href={href} passHref>
        {linkComponent}
      </NextLink>
    </Typography>
  );
};
