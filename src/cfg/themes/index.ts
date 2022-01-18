import { FuryRecord } from '@ricardo-jrm/fury';
import { soul } from './soul';
import { soulDark } from './soul-dark';
import { kcal } from './kcal';
import { kcalDark } from './kcal-dark';

export const themes: FuryRecord = {
  soul,
  kcal,
  'soul-dark': soulDark,
  'kcal-dark': kcalDark,
};
