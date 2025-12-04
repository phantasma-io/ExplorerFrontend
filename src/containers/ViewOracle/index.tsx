import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useApi, useI18n } from 'hooks';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
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
  const { t, locale } = useI18n();

  const { query } = useRouter();

  const { data, error, loading } = useApi<OracleResults>(
    endpoints['/oracles']({
      block_hash: (query?.id as string) || '',
    } as OracleParams),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: t('tab-overview'),
        href: routes['/event'](locale as Locales),
        component: (
          <OracleOverview data={data} loading={loading} error={error} />
        ),
      },
      raw: {
        id: 'raw',
        label: t('tab-raw'),
        href: routes['/event'](locale as Locales),
        component: <OracleRaw data={data} loading={loading} error={error} />,
      },
    }),
    [t, locale, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="blocks" route="/block" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
