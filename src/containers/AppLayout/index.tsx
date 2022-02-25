import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { MetaTags } from 'components';
import { routesHome } from 'cfg';
import { LayoutHome } from '../LayoutHome';
import { LayoutPage } from '../LayoutPage';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { asPath } = useRouter();

  return (
    <Box>
      <MetaTags />
      {routesHome.includes(asPath) ? (
        <LayoutHome>{children}</LayoutHome>
      ) : (
        <LayoutPage>{children}</LayoutPage>
      )}
    </Box>
  );
};
