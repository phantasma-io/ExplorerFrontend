import React, { isValidElement, ReactElement } from 'react';
import NextLink from 'next/link';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

export interface LinkProps extends Omit<MuiLinkProps, 'href'> {
  external?: boolean;
  href: string;
  withDec?: boolean;
  /**
   * When true, no wrapper is rendered; the child is turned into the link target via `component` + `href`.
   * Use for interactive children like Buttons/IconButtons to avoid nesting anchors.
   */
  asChild?: boolean;
}

export const Link = ({
  children,
  external,
  href,
  sx,
  withDec,
  asChild,
  ...props
}: LinkProps) => {
  const decoration = withDec ? 'underline' : 'none';

  if (asChild && isValidElement(children)) {
    if (external) {
      return React.cloneElement(children as ReactElement, {
        component: 'a',
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
        ...props,
      } as any);
    }

    return React.cloneElement(children as ReactElement, {
      component: NextLink,
      href,
      ...props,
    } as any);
  }

  if (external) {
    return (
      <MuiLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ textDecoration: decoration, ...sx }}
        {...props}
      >
        {children}
      </MuiLink>
    );
  }

  return (
    <MuiLink
      component={NextLink}
      href={href}
      sx={{ textDecoration: decoration, ...sx }}
      {...props}
    >
      {children}
    </MuiLink>
  );
};
