import { Locales, LocalesArr, LocalesRecord } from 'types/locales';
import { en } from './en';
import { pt } from './pt';
import { de } from './de';
import { fr } from './fr';

export const locales: LocalesRecord = {
  en,
  pt,
  de,
  fr,
};

export const localesKeys: LocalesArr = Object.keys(locales) as LocalesArr;

export const localesDefault: Locales = localesKeys[0] as Locales;
