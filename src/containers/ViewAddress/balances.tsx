import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { Text } from 'components/display';
import { Address, AddressResults } from 'types/api';
import { Locales } from 'types/locales';
import { routes } from 'cfg';
import { useI18n } from 'hooks';

export interface AddressBalancesProps {
  data?: AddressResults;
  address?: Address;
}

export const AddressBalances = ({ data, address }: AddressBalancesProps) => {
  const { t, locale } = useI18n();

  const balances = useMemo<Address['balances']>(() => {
    if (address) {
      return address?.balances;
    }

    if (data?.addresses && data.addresses[0] && data.addresses[0].balances) {
      return data.addresses[0].balances;
    }
    return undefined;
  }, [data, address]);

  if (balances && balances.length) {
    return (
      <Box py={0.6}>
        <Box mb={1.5}>
          <Text
            variant="body2"
            value={`${t('tab-balances')}:`}
            fontWeight={600}
          />
        </Box>
        {balances.map((item, index) => {
          if (item?.amount) {
            return (
              <Box
                px={2}
                py={0.6}
                key={`${item?.token?.symbol ?? 'balance'}-${index}`}
              >
                <Grid item container xs={12} spacing={1}>
                  <Text
                    variant="body2"
                    label={item?.token?.symbol}
                    formatNumber={item?.amount}
                    spacing={1}
                    linkOptions={{
                      link: routes['/token'](locale as Locales, {
                        id: item?.token?.symbol,
                      }),
                      title: t('explore-token'),
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
