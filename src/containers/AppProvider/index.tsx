import React from 'react';
import { SnackbarProvider } from 'notistack';
import { defaultThemeId, locales, localesDefault } from 'cfg';
import { ThemeSettingsProvider, I18nProvider } from 'hooks';
import { DatetimeOptsProvider } from 'hooks/datetime/DatetimeOptsProvider';
import { Locales } from 'types/locales';

/**
 * AppProviderProps
 */
interface AppProviderProps {
  locale?: Locales;
  children: JSX.Element;
}

/**
 * AppProvider
 */
export const AppProvider = ({ locale, children }: AppProviderProps) => (
  <SnackbarProvider maxSnack={3}>
    <I18nProvider locale={locale ?? localesDefault} messages={locales}>
      <ThemeSettingsProvider initialThemeId={defaultThemeId}>
        <DatetimeOptsProvider>
          {children}
        </DatetimeOptsProvider>
      </ThemeSettingsProvider>
    </I18nProvider>
  </SnackbarProvider>
);
