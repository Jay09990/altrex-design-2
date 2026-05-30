// Shared theme context types/state for use by `ThemeProvider` and `useTheme`.

import { createContext } from "react";

import type { Theme } from "@/lib/theme";

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

