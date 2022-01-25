import React from 'react';
import { SnackbarProvider } from 'notistack';
import { FuryProvider } from '@ricardo-jrm/fury';
import { EchoProvider } from '@ricardo-jrm/echo';
import { locales, localesDefault, themes } from '../../cfg';

/**
 * AppProviderProps
 */
interface AppProviderProps {
  children: JSX.Element;
}

/**
 * AppProvider
 */
export const AppProvider = ({ children }: AppProviderProps) => (
  <SnackbarProvider maxSnack={3}>
    <FuryProvider
      fury={themes}
      furyDefault="soul"
      lsid="phantasma-explorer-theme"
    >
      {children}
    </FuryProvider>
  </SnackbarProvider>
);
