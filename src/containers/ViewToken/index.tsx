import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { useEcho } from '@ricardo-jrm/echo';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { TokenResults } from 'types/api';
import { TokenOverview } from './overview';

export interface ViewTokenProps {
  tabForce?: ExplorerTabs;
}

export const ViewToken = ({ tabForce = 'overview' }: ViewTokenProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useEmpathy<TokenResults>(
    endpoints['/tokens']({
      symbol: (query?.id as string) || '',
    }),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/token'](echoActiveId as Locales),
        component: (
          <TokenOverview data={data} loading={loading} error={error} />
        ),
      },
    }),
    [echo, echoActiveId, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="tokens" label={echo('tab-tokens')} />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
