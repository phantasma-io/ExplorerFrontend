import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useApi } from 'hooks';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { PlatformResults, PlatformParams } from 'types/api';
import { PlatformOverview } from './overview';
import { PlatformRaw } from './raw';

export interface ViewPlatformProps {
  tabForce?: ExplorerTabs;
}

export const ViewPlatform = ({ tabForce = 'overview' }: ViewPlatformProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useApi<PlatformResults>(
    endpoints['/platforms']({
      name: (query?.id as string) || '',
    } as PlatformParams),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/platform'](echoActiveId as Locales),
        component: (
          <PlatformOverview data={data} loading={loading} error={error} />
        ),
      },
      raw: {
        id: 'raw',
        label: echo('tab-raw'),
        href: routes['/platform'](echoActiveId as Locales),
        component: <PlatformRaw data={data} loading={loading} error={error} />,
      },
    }),
    [echo, echoActiveId, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="platforms" route="/platform" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
