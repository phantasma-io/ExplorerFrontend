import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import { Locales, ExplorerRoutes } from '../../cfg';
import {
  ViewHome,
  ViewAddress,
  ViewBlock,
  ViewChain,
  ViewContract,
  ViewDao,
  ViewNexus,
  ViewToken,
  ViewTransaction,
} from '../index';
import { Text } from '../../components';

interface LocalizedViewProps {
  locale: Locales;
  route: ExplorerRoutes;
}

export const LocalizedView = ({ locale, route }: LocalizedViewProps) => {
  const { query } = useRouter();
  const { echo, echoSetById } = useEcho();

  useEffect(() => {
    echoSetById(locale);
  });

  const children = useMemo(() => {
    switch (route) {
      case '/address':
        return <ViewAddress />;
      case '/block':
        return <ViewBlock />;
      case '/chain':
        return <ViewChain />;
      case '/contract':
        return <ViewContract />;
      case '/dao':
        return <ViewDao />;
      case '/nexus':
        return <ViewNexus />;
      case '/token':
        return <ViewToken />;
      case '/transaction':
        return <ViewTransaction />;
      case '/':
      default:
        return <ViewHome />;
    }
  }, [route]);

  if (route === '/') {
    return <Box>{children}</Box>;
  }

  return (
    <Box>
      <Box pt={{ xs: 3, lg: 6 }} pb={3}>
        <Text
          variant="h3"
          sx={{ color: '#fff' }}
          value={echo(`title-${query?.view as string}`)}
        />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
