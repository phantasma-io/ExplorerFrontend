import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useApi } from 'hooks';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { NftResults, NftParams } from 'types/api';
import { NftOverview } from './overview';
import { NftRaw } from './raw';

export interface ViewNftProps {
  tabForce?: ExplorerTabs;
}

export const ViewNft = ({ tabForce = 'overview' }: ViewNftProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useApi<NftResults>(
    endpoints['/nfts']({
      token_id: (query?.id as string) || '',
      with_logo: 1,
      with_price: 1,
    } as NftParams),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/nft'](echoActiveId as Locales),
        component: <NftOverview data={data} loading={loading} error={error} />,
      },
      raw: {
        id: 'raw',
        label: echo('tab-raw'),
        href: routes['/nft'](echoActiveId as Locales),
        component: <NftRaw data={data} loading={loading} error={error} />,
      },
    }),
    [echo, echoActiveId, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="nfts" route="/nft" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
