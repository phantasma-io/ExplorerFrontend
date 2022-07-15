import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { DaoResults, DaoParams } from 'types/api';
import { DaoOverview } from './overview';
import { DaoRaw } from './raw';

export interface ViewDaoProps {
  tabForce?: ExplorerTabs;
}

export const ViewDao = ({ tabForce = 'overview' }: ViewDaoProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useEmpathy<DaoResults>(
    endpoints['/organizations']({
      organization_name: (query?.id as string) || '',
    } as DaoParams),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/dao'](echoActiveId as Locales),
        component: <DaoOverview data={data} loading={loading} error={error} />,
      },
      raw: {
        id: 'raw',
        label: echo('tab-raw'),
        href: routes['/dao'](echoActiveId as Locales),
        component: <DaoRaw data={data} loading={loading} error={error} />,
      },
    }),
    [echo, echoActiveId, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="daos" route="/dao" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
