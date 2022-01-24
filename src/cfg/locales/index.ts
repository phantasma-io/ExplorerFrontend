import { EchoMsgs } from '@ricardo-jrm/echo';
import { en } from './en';
import { pt } from './pt';
import { de } from './de';
import { fr } from './fr';

export type Locales = 'en' | 'pt' | 'de' | 'fr';

type LocalesRecord = {
  [key in Locales]: EchoMsgs;
};

export const locales: LocalesRecord = {
  en,
  pt,
  de,
  fr,
};

export const localesKeys = Object.keys(locales);

export const localesDefault: Locales = localesKeys[0] as Locales;
