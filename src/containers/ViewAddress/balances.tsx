import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useEcho } from '@ricardo-jrm/echo';
import { Box, Grid } from '@mui/material';
import { Text } from 'components/display';
import { Empty } from 'components/layout';
import { Address, AddressResults } from 'types/api';
import { Locales } from 'types/locales';
import { routes } from 'cfg';

export interface AddressBalancesProps {
  data?: AddressResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const AddressBalances = ({ data }: AddressBalancesProps) => {
  const { echo, echoActiveId } = useEcho();

  const balances = useMemo<Address['balances']>(() => {
    if (data?.addresses && data.addresses[0] && data.addresses[0].balances) {
      return data.addresses[0].balances;
    }
    return undefined;
  }, [data]);

  if (balances) {
    return (
      <Box p={1}>
        {balances.length === 0 && <Empty />}
        {balances.map((item) => (
          <Box p={1} key={nanoid()}>
            <Grid item container xs={12} spacing={1}>
              {item?.amount && (
                <Text
                  variant="body2"
                  label={item?.token?.symbol}
                  formatNumber={parseInt(item.amount, 10)}
                  spacing={1}
                  linkOptions={{
                    link: routes['/token'](echoActiveId as Locales, {
                      id: item?.token?.symbol,
                    }),
                    title: echo('explore-token'),
                  }}
                />
              )}
            </Grid>
          </Box>
        ))}
      </Box>
    );
  }

  return null;
};
