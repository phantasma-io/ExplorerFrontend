import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { CssBaseline, Theme, ThemeProvider, createTheme } from '@mui/material';
import { themes } from 'cfg/themes';

export type ThemeId = 'soul' | 'soul-dark';

interface ThemeContextType {
  themeActive: Theme;
  themeActiveId: ThemeId;
  themeSetById: (id: ThemeId) => void;
}

const DEFAULT_THEME: ThemeId = 'soul';

const ThemeCtx = createContext<ThemeContextType>({
  themeActive: createTheme(themes[DEFAULT_THEME]),
  themeActiveId: DEFAULT_THEME,
  themeSetById: () => undefined,
});

export const useThemeMode = () => useContext(ThemeCtx);

export const ThemeModeProvider = ({ children }: { children: JSX.Element }) => {
  const [themeActiveId, themeActiveIdSet] = useState<ThemeId>(DEFAULT_THEME);

  const themeActive = useMemo<Theme>(
    () => createTheme(themes[themeActiveId]),
    [themeActiveId],
  );

  const themeSetById = useCallback(
    (id: ThemeId) => {
      if (themes[id]) {
        themeActiveIdSet(id);
      }
    },
    [themeActiveIdSet],
  );

  const value = useMemo<ThemeContextType>(
    () => ({
      themeActive,
      themeActiveId,
      themeSetById,
    }),
    [themeActive, themeActiveId, themeSetById],
  );

  return (
    <ThemeCtx.Provider value={value}>
      <ThemeProvider theme={themeActive}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeCtx.Provider>
  );
};
