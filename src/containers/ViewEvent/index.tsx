import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { EventResults, EventParams } from 'types/api';
import { EventOverview } from './overview';

export interface ViewEventProps {
  tabForce?: ExplorerTabs;
}

export const ViewEvent = ({ tabForce = 'overview' }: ViewEventProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useEmpathy<EventResults>(
    endpoints['/events']({
      event_id: (query?.id as string) || '',
      with_logo: 1,
      with_price: 1,
    } as EventParams),
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
    }),
    [echo, echoActiveId, data, error, loading],
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
