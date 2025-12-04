import React from 'react';
import NextLink from 'next/link';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

/**
 * Link props
 */
export interface LinkProps extends MuiLinkProps {
  external?: boolean;
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
  ...propsLink
}: LinkProps) => {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const linkComponent = (
    <MuiLink
      href={href}
      {...linkProps}
      {...propsLink}
      sx={{ textDecoration: withDec ? 'underline' : 'none', ...sx }}
    >
      {children}
    </MuiLink>
  );

  if (external) {
    return linkComponent;
  }

  return (
    <NextLink href={href as string} passHref legacyBehavior>
      {linkComponent}
    </NextLink>
  );
};
