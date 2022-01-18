import React from 'react';
import { SnackbarProvider } from 'notistack';
import { FuryProvider } from '@ricardo-jrm/fury';
import { PainProvider } from '@ricardo-jrm/pain';
import { EchoProvider } from '@ricardo-jrm/echo';
import { locales, metas, themes } from '../../cfg';

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
    <EchoProvider echo={locales} echoDefault="en">
      <PainProvider pain={metas} painDefault="soul">
        <FuryProvider fury={themes} furyDefault="soul">
          {children}
        </FuryProvider>
      </PainProvider>
    </EchoProvider>
  </SnackbarProvider>
);
