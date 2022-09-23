import { Locales, LocalesArr, LocalesRecord } from 'types/locales';
import { en } from './en';
import { pt } from './pt';
import { de } from './de';

export const locales: LocalesRecord = {
  en,
  pt,
  de,
};

export const localesKeys: LocalesArr = Object.keys(locales) as LocalesArr;

export const localesDefault: Locales = localesKeys[0] as Locales;
