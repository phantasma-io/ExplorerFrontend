import { EchoMsgs } from '@ricardojrmcom/echo';

export type Locales = 'en' | 'pt' | 'de';
export type LocalesArr = ['en', 'pt', 'de'];

export type LocalesRecord = {
  [key in Locales]: EchoMsgs;
};
