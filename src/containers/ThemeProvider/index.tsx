import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
const THEME_STORAGE_KEY = 'explorer-theme-id';

const ThemeCtx = createContext<ThemeContextType>({
  themeActive: createTheme(themes[DEFAULT_THEME]),
  themeActiveId: DEFAULT_THEME,
  themeSetById: () => undefined,
});

export const useThemeMode = () => useContext(ThemeCtx);

export const ThemeModeProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [themeActiveId, themeActiveIdSet] = useState<ThemeId>(DEFAULT_THEME);
  const [isReady, isReadySet] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'soul' || stored === 'soul-dark') {
      themeActiveIdSet(stored);
      isReadySet(true);
      return;
    }

    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
      themeActiveIdSet('soul-dark');
    }

    isReadySet(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, themeActiveId);
  }, [isReady, themeActiveId]);

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
