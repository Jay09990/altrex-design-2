// Theme utilities for the app: resolves initial theme, persists preference, and applies the `dark` class globally.

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "altrex-theme";
const DARK_CLASS_NAME = "dark";

export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    if (value === "light" || value === "dark") return value;
    return null;
  } catch {
    return null;
  }
}

export function setStoredTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors (private mode, blocked storage, etc.)
  }
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyThemeToDocument(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const shouldBeDark = theme === "dark";
  root.classList.toggle(DARK_CLASS_NAME, shouldBeDark);
  root.style.colorScheme = shouldBeDark ? "dark" : "light";
}

export function resolveInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

