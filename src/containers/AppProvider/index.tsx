import React from 'react';
import { locales, metas, themes, AceProvider } from '@ricardo-jrm/ace';

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
  <AceProvider
    locales={locales}
    metas={metas}
    themes={themes}
    localesDefault="en"
    metasDefault="nebula"
    themesDefault="nebula"
  >
    {children}
  </AceProvider>
);
