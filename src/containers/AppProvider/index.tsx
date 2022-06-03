import React from 'react';
import { SnackbarProvider } from 'notistack';
import { FuryProvider } from '@ricardojrmcom/fury';
import { themes } from 'cfg';
import { DatetimeOptsProvider } from 'hooks/datetime/DatetimeOptsProvider';

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
    <DatetimeOptsProvider>
      <FuryProvider
        fury={themes}
        furyDefault="soul"
        lsid="phantasma-explorer-theme"
      >
        {children}
      </FuryProvider>
    </DatetimeOptsProvider>
  </SnackbarProvider>
);
