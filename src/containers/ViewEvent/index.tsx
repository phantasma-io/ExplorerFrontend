import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useApi, useI18n } from 'hooks';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { EventResults, EventParams } from 'types/api';
import { EventOverview } from './overview';
import { EventRaw } from './raw';

export interface ViewEventProps {
  tabForce?: ExplorerTabs;
}

export const ViewEvent = ({ tabForce = 'overview' }: ViewEventProps) => {
  const { t, locale } = useI18n();

  const { query } = useRouter();

  const { data, error, loading } = useApi<EventResults>(
    endpoints['/events']({
      event_id: (query?.id as string) || '',
      with_fiat: 1,
      with_event_data: 1,
    } as EventParams),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: t('tab-overview'),
        href: routes['/event'](locale as Locales),
        component: (
          <EventOverview data={data} loading={loading} error={error} />
        ),
      },
      raw: {
        id: 'raw',
        label: t('tab-raw'),
        href: routes['/event'](locale as Locales),
        component: <EventRaw data={data} loading={loading} error={error} />,
      },
    }),
    [t, locale, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="events" route="/event" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
