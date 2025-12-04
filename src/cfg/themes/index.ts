import { ThemeOptions } from '@mui/material';
import { soul } from './soul';
import { soulDark } from './soul-dark';
import { kcal } from './kcal';
import { kcalDark } from './kcal-dark';
import { gm } from './gm';
import { gmDark } from './gm-dark';

export const themeIds = [
  'soul',
  'soul-dark',
  'kcal',
  'kcal-dark',
  'gm',
  'gm-dark',
] as const;

export type ThemeId = typeof themeIds[number];

export const defaultThemeId: ThemeId = 'soul';

export const themes: Record<ThemeId, ThemeOptions> = {
  soul,
  'soul-dark': soulDark,
  kcal,
  'kcal-dark': kcalDark,
  gm,
  'gm-dark': gmDark,
};
