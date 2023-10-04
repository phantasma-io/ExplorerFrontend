import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { TokenResults, TokenParams } from 'types/api';
import { TokenOverview } from './overview';
import { TokenScript } from './script';
import { TokenInstructions } from './instructions';
import { TokenRaw } from './raw';

export interface ViewTokenProps {
  tabForce?: ExplorerTabs;
}

export const ViewToken = ({ tabForce = 'overview' }: ViewTokenProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useEmpathy<TokenResults>(
    endpoints['/tokens']({
      symbol: (query?.id as string) || '',
      with_logo: 1,
      with_price: 1,
    } as TokenParams),
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
      instructions: {
        id: 'instructions',
        label: echo('tab-instructions'),
        href: routes['/token'](echoActiveId as Locales),
        component: (
          <TokenInstructions
            data={data}
            loading={loading}
            error={error}
            scr={data?.tokens && data?.tokens[0] && data?.tokens[0].script_raw}
          />
        ),
      },
      script: {
        id: 'script',
        label: echo('tab-script'),
        href: routes['/token'](echoActiveId as Locales),
        component: <TokenScript data={data} loading={loading} error={error} />,
      },
      raw: {
        id: 'raw',
        label: echo('tab-raw'),
        href: routes['/token'](echoActiveId as Locales),
        component: <TokenRaw data={data} loading={loading} error={error} />,
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
