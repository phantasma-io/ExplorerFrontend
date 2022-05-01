import { useMemo, useCallback } from 'react';
import { useFury } from '@ricardojrmcom/fury';

export const useDarkMode = () => {
  const { furyActiveId, furySetById } = useFury();

  const isDark = useMemo(() => furyActiveId.includes('-dark'), [furyActiveId]);

  const toggleDarkMode = useCallback(() => {
    if (isDark) {
      furySetById(furyActiveId.split('-')[0]);
    } else {
      furySetById(`${furyActiveId}-dark`);
    }
  }, [isDark, furyActiveId, furySetById]);

  return { isDark, toggleDarkMode };
};
