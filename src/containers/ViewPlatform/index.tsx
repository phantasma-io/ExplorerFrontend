import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord } from 'components/layout';
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

  const { data, error, loading } = useEmpathy<PlatformResults>(
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
      <NavTabs tabs={tabs} tabsDefault={tabForce} />
    </Box>
  );
};
