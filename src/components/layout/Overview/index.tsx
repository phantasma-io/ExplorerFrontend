import React from 'react';
import { Grid } from '@mui/material';
import { Text, TextProps } from '../../display/Text';
import { Link } from '../../display/Link';

export interface OverviewItem extends TextProps {
  link?: {
    href: string;
    external?: boolean;
  };
}

/**
 * Overview props
 */
export interface OverviewProps {
  items: OverviewItem[];
}

/**
 * Overview
 */
export const Overview = ({ items }: OverviewProps) => {
  return (
    <Grid container spacing={1}>
      {items.map((item) => {
        const { link, value, ...textProps } = item;

        return (
          <Grid item xs={12} key={item.label}>
            {link ? (
              <Text spacing={1} value={value} {...textProps}>
                <Link href={link.href} external={link.external}>
                  {value}
                </Link>
              </Text>
            ) : (
              <Text spacing={1} value={value} {...textProps} />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};
