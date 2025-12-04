import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  SetStateAction,
} from 'react';
import { localesDefault } from 'cfg';
import { Locales, LocalesRecord } from 'types/locales';
import { useLocalStorage } from './useLocalStorage';

interface I18nContextValue {
  locale: Locales;
  setLocale: (locale: SetStateAction<Locales>) => void;
  t: (key: string) => string;
  messages: Record<string, string>;
}

const I18nContext = createContext<I18nContextValue>({
  locale: localesDefault,
  setLocale: () => undefined,
  t: (key: string) => key,
  messages: {},
});

export interface I18nProviderProps {
  locale: Locales;
  messages: LocalesRecord;
  storageKey?: string;
  children: React.ReactNode;
}

export const I18nProvider = ({
  locale,
  messages,
  storageKey = 'phantasma-explorer-locale',
  children,
}: I18nProviderProps) => {
  const [activeLocale, setActiveLocale] = useLocalStorage<Locales>(
    storageKey,
    locale ?? localesDefault,
  );

  useEffect(() => {
    if (locale && locale !== activeLocale) {
      setActiveLocale(locale);
    }
  }, [activeLocale, locale, setActiveLocale]);

  const activeMessages = useMemo(
    () => messages[activeLocale] ?? {},
    [activeLocale, messages],
  );

  const translate = useCallback(
    (key: string) => activeMessages[key] ?? key,
    [activeMessages],
  );

  const value = useMemo(
    () => ({
      locale: activeLocale,
      setLocale: setActiveLocale,
      t: translate,
      messages: activeMessages,
    }),
    [activeLocale, translate, activeMessages, setActiveLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
