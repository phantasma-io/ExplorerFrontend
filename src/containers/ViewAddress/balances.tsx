import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useEcho } from '@ricardo-jrm/echo';
import { Box, Grid } from '@mui/material';
import { Text } from 'components/display';
import { Address, AddressResults } from 'types/api';
import { Locales } from 'types/locales';
import { routes } from 'cfg';
import { parseDecimals } from 'scripts';

export interface AddressBalancesProps {
  data?: AddressResults;
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
      <Box py={1}>
        <Box mb={1.5}>
          <Text
            variant="body2"
            value={`${echo('tab-balances')}:`}
            fontWeight={600}
          />
        </Box>
        {balances.map((item) => {
          if (item?.amount) {
            const { number, format } = parseDecimals(
              item.amount,
              item?.token?.decimals || 0,
            );
            return (
              <Box px={2} py={0.6} key={nanoid()}>
                <Grid item container xs={12} spacing={1}>
                  <Text
                    variant="body2"
                    label={item?.token?.symbol}
                    formatNumber={number}
                    formatNumberStr={format}
                    spacing={1}
                    linkOptions={{
                      link: routes['/token'](echoActiveId as Locales, {
                        id: item?.token?.symbol,
                      }),
                      title: echo('explore-token'),
                    }}
                  />
                </Grid>
              </Box>
            );
          }
          return null;
        })}
      </Box>
    );
  }

  return null;
};
