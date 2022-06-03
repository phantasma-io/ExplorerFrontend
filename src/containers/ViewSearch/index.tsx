import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { routes, endpoints } from 'cfg';
import { AddressResults } from 'types/api';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';

export interface ViewSearchProps {}

export const ViewSearch = ({}: ViewSearchProps) => {
  const { echo } = useEcho();

  const { query } = useRouter();

  // const { data, loading, error } = useEmpathy<AddressResults>(
  //   endpoints['/addresses']({
  //     address: (query?.id as string) || '',
  //     with_balance: 1,
  //     with_stakes: 1,
  //     with_storage: 1,
  //   }),
  // );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="addresses" route="/search" />
      </Box>
      <Box>SEARCH</Box>
    </Box>
  );
};
