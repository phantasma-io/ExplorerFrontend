import React from 'react';
import { AceProvider } from '@ricardo-jrm/ace';
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
  <AceProvider
    locales={locales}
    metas={metas}
    themes={themes}
    localesDefault="en"
    metasDefault="soul"
    themesDefault="soul"
  >
    {children}
  </AceProvider>
);
