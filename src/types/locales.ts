import { EchoMsgs } from '@ricardojrmcom/echo';

export type Locales = 'en' | 'pt' | 'de' | 'fr';
export type LocalesArr = ['en', 'pt', 'de', 'fr'];

export type LocalesRecord = {
  [key in Locales]: EchoMsgs;
};
