import React, { ReactNode, useRef } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Resource, createInstance } from 'i18next';
import { locales, localesDefault } from 'cfg';
import { Locales } from 'types/locales';

const resources: Resource = Object.entries(locales).reduce(
  (acc, [locale, messages]) => ({
    ...acc,
    [locale]: { translation: messages },
  }),
  {},
);

interface I18nProviderProps {
  locale: Locales;
  children: ReactNode;
}

export const I18nProvider = ({ locale, children }: I18nProviderProps) => {
  const i18nRef = useRef(createInstance());

  if (!i18nRef.current.isInitialized) {
    i18nRef.current
      .use(initReactI18next)
      .init({
        resources,
        lng: locale,
        fallbackLng: localesDefault,
        interpolation: { escapeValue: false },
        initImmediate: false,
        returnEmptyString: false,
      })
      .catch(() => undefined);
  } else if (i18nRef.current.language !== locale) {
    i18nRef.current.changeLanguage(locale).catch(() => undefined);
  }

  return <I18nextProvider i18n={i18nRef.current}>{children}</I18nextProvider>;
};
