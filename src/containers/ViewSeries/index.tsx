import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { SeriesResults, SeriesParams } from 'types/api';
import { SeriesOverview } from './overview';

export interface ViewSeriesProps {
  tabForce?: ExplorerTabs;
}

export const ViewSeries = ({ tabForce = 'overview' }: ViewSeriesProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useEmpathy<SeriesResults>(
    endpoints['/series']({
      id: (query?.id as string) || '',
    } as SeriesParams),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/series'](echoActiveId as Locales),
        component: (
          <SeriesOverview data={data} loading={loading} error={error} />
        ),
      },
    }),
    [echo, echoActiveId, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="series" label={echo('tab-series')} />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
