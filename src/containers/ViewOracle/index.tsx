import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { OracleResults, OracleParams } from 'types/api';
import { OracleOverview } from './overview';
import { OracleRaw } from './raw';

export interface ViewOracleProps {
  tabForce?: ExplorerTabs;
}

export const ViewOracle = ({ tabForce = 'overview' }: ViewOracleProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useEmpathy<OracleResults>(
    endpoints['/oracles']({
      block_hash: (query?.id as string) || '',
    } as OracleParams),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/event'](echoActiveId as Locales),
        component: (
          <OracleOverview data={data} loading={loading} error={error} />
        ),
      },
      raw: {
        id: 'raw',
        label: echo('tab-raw'),
        href: routes['/event'](echoActiveId as Locales),
        component: <OracleRaw data={data} loading={loading} error={error} />,
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
