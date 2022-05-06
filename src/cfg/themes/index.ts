import { FuryRecord } from '@ricardojrmcom/fury';
import { soul } from './soul';
import { soulDark } from './soul-dark';
import { kcal } from './kcal';
import { kcalDark } from './kcal-dark';
import { gm } from './gm';
import { gmDark } from './gm-dark';

export const themes: FuryRecord = {
  soul,
  'soul-dark': soulDark,
  kcal,
  'kcal-dark': kcalDark,
  gm,
  'gm-dark': gmDark,
};
