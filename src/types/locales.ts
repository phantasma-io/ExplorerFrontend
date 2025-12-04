export type Locales = 'en' | 'pt' | 'de';
export type LocalesArr = ['en', 'pt', 'de'];

export type LocaleMessages = Record<string, string>;

export type LocalesRecord = {
  [key in Locales]: LocaleMessages;
};
