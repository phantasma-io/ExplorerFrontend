import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { MetaTags } from 'components/meta';
import { LayoutHome } from '../LayoutHome';
import { LayoutPage } from '../LayoutPage';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { route, query } = useRouter();
  const isHome = route === '/[locale]' && !('view' in query);

  return (
    <Box>
      <MetaTags />
      {isHome ? (
        <LayoutHome>{children}</LayoutHome>
      ) : (
        <LayoutPage>{children}</LayoutPage>
      )}
    </Box>
  );
};
