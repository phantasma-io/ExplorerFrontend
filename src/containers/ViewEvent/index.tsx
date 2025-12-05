import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useApi } from 'hooks';
import { useEcho } from '@ricardojrmcom/echo';
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
  const { echo, echoActiveId } = useEcho();

  const { query, isReady } = useRouter();
  const ready = typeof window === 'undefined' ? true : isReady;

  const { data, error, loading } = useApi<EventResults>(
    ready && query?.id
      ? endpoints['/events']({
          event_id: (query?.id as string) || '',
          with_fiat: 1,
          with_event_data: 1,
        } as EventParams)
      : null,
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/event'](echoActiveId as Locales),
        component: (
          <EventOverview data={data} loading={loading} error={error} />
        ),
      },
      raw: {
        id: 'raw',
        label: echo('tab-raw'),
        href: routes['/event'](echoActiveId as Locales),
        component: <EventRaw data={data} loading={loading} error={error} />,
      },
    }),
    [echo, echoActiveId, data, error, loading],
  );

  if (!ready || !query?.id) {
    return null;
  }

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
