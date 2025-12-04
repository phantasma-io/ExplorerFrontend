import React, { createContext, useContext, useMemo, SetStateAction } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { defaultThemeId, themes, ThemeId } from 'cfg';
import { useLocalStorage } from './useLocalStorage';

interface ThemeSettingsContextValue {
  themeId: ThemeId;
  setThemeId: (value: SetStateAction<ThemeId>) => void;
  theme: Theme;
}

const fallbackTheme = createTheme(themes[defaultThemeId]);

const ThemeSettingsContext = createContext<ThemeSettingsContextValue>({
  themeId: defaultThemeId,
  setThemeId: () => undefined,
  theme: fallbackTheme,
});

export interface ThemeSettingsProviderProps {
  children: React.ReactNode;
  initialThemeId?: ThemeId;
}

export const ThemeSettingsProvider = ({
  children,
  initialThemeId = defaultThemeId,
}: ThemeSettingsProviderProps) => {
  const [themeId, setThemeId] = useLocalStorage<ThemeId>(
    'phantasma-explorer-theme',
    initialThemeId,
  );

  const theme = useMemo(() => {
    const themeOptions = themes[themeId] ?? themes[defaultThemeId];
    return createTheme(themeOptions);
  }, [themeId]);

  const value = useMemo(
    () => ({
      themeId,
      setThemeId,
      theme,
    }),
    [theme, themeId, setThemeId],
  );

  return (
    <ThemeSettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeSettingsContext.Provider>
  );
};

export const useThemeSettings = () => useContext(ThemeSettingsContext);
