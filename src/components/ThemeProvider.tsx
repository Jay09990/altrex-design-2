// Provides global dark/light theme state with persistence and keeps the document `dark` class in sync.

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  applyThemeToDocument,
  getStoredTheme,
  getSystemTheme,
  resolveInitialTheme,
  setStoredTheme,
  type Theme,
} from "@/lib/theme";
import { ThemeContext, type ThemeContextValue } from "@/theme/themeContext";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => resolveInitialTheme());

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    setStoredTheme(nextTheme);
    applyThemeToDocument(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = getStoredTheme();
    if (storedTheme) return;

    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mediaQuery) return;

    const handleChange = () => {
      const nextTheme = getSystemTheme();
      setThemeState(nextTheme);
      applyThemeToDocument(nextTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
