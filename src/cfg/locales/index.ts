import { EchoMsgs } from '@ricardo-jrm/echo';
import { en } from './en';
import { pt } from './pt';
import { de } from './de';
import { fr } from './fr';

export type Locales = 'en' | 'pt' | 'de' | 'fr';
export type LocalesArr = ['en', 'pt', 'de', 'fr'];

type LocalesRecord = {
  [key in Locales]: EchoMsgs;
};

export const locales: LocalesRecord = {
  en,
  pt,
  de,
  fr,
};

export const localesKeys: LocalesArr = Object.keys(locales) as LocalesArr;

export const localesDefault: Locales = localesKeys[0] as Locales;
