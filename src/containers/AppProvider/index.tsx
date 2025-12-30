import React from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeModeProvider } from 'containers/ThemeProvider';
import { DatetimeOptsProvider } from 'hooks/datetime/DatetimeOptsProvider';

/**
 * AppProviderProps
 */
interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * AppProvider
 */
export const AppProvider = ({ children }: AppProviderProps) => (
  <SnackbarProvider maxSnack={3}>
    <DatetimeOptsProvider>
      <ThemeModeProvider>
        {children}
      </ThemeModeProvider>
    </DatetimeOptsProvider>
  </SnackbarProvider>
);
