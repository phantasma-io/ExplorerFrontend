import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Locales } from 'types/locales';
import { localesDefault } from 'cfg';

export const useEcho = () => {
  const { t, i18n } = useTranslation();

  const echo = useCallback(
    (key: string) => t(key, { defaultValue: key }),
    [t],
  );

  const echoSetById = useCallback(
    (locale: Locales) => {
      if (i18n.language !== locale) {
        i18n.changeLanguage(locale).catch(() => undefined);
      }
    },
    [i18n],
  );

  const echoActiveId =
    (i18n.resolvedLanguage as Locales | undefined) ||
    (i18n.language as Locales | undefined) ||
    localesDefault;

  return { echo, echoActiveId, echoSetById };
};
