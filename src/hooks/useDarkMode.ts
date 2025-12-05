import { useMemo, useCallback } from 'react';
import { useThemeMode } from 'containers/ThemeProvider';

export const useDarkMode = () => {
  const { themeActiveId, themeSetById } = useThemeMode();

  const isDark = useMemo(
    () => themeActiveId.includes('-dark'),
    [themeActiveId],
  );

  const toggleDarkMode = useCallback(() => {
    if (isDark) {
      themeSetById('soul');
    } else {
      themeSetById('soul-dark');
    }
  }, [isDark, themeSetById]);

  return { isDark, toggleDarkMode };
};
