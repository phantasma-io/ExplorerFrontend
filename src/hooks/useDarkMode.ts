import { useMemo, useCallback } from 'react';
import { themes, ThemeId } from 'cfg';
import { useThemeSettings } from './useThemeSettings';

export const useDarkMode = () => {
  const { themeId, setThemeId } = useThemeSettings();

  const isDark = useMemo(() => themeId.includes('-dark'), [themeId]);

  const toggleDarkMode = useCallback(() => {
    setThemeId((current) => {
      if (current.includes('-dark')) {
        const nextId = current.replace('-dark', '') as ThemeId;
        return themes[nextId] ? nextId : current;
      }

      const darkId = `${current}-dark` as ThemeId;
      return themes[darkId] ? darkId : current;
    });
  }, [setThemeId]);

  return { isDark, toggleDarkMode };
};
