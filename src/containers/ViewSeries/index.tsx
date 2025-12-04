import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useApi, useI18n } from 'hooks';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { SeriesResults, SeriesParams } from 'types/api';
import { SeriesOverview } from './overview';
import { SeriesRaw } from './raw';

export interface ViewSeriesProps {
  tabForce?: ExplorerTabs;
}

export const ViewSeries = ({ tabForce = 'overview' }: ViewSeriesProps) => {
  const { t, locale } = useI18n();

  const { query } = useRouter();

  const { data, error, loading } = useApi<SeriesResults>(
    endpoints['/series']({
      id: (query?.id as string) || '',
    } as SeriesParams),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: t('tab-overview'),
        href: routes['/series'](locale as Locales),
        component: (
          <SeriesOverview data={data} loading={loading} error={error} />
        ),
      },
      raw: {
        id: 'raw',
        label: t('tab-raw'),
        href: routes['/series'](locale as Locales),
        component: <SeriesRaw data={data} loading={loading} error={error} />,
      },
    }),
    [t, locale, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="series" route="/series" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
