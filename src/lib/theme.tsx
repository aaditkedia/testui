"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { palettes, type Palette, type ThemeName } from "@/config/theme.tokens";
import { THEME_STORAGE_KEY } from "./theme-config";

type ThemeContextValue = {
  theme: ThemeName;
  colors: Palette;
  toggle: () => void;
  setTheme: (t: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(t: ThemeName) {
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
  root.style.colorScheme = t;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Must match SSR (light) on first render; corrected in the effect below.
  const [theme, setThemeState] = useState<ThemeName>("light");

  useEffect(() => {
    // Read whatever the init script already resolved onto <html>.
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
  }, []);

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t);
    applyTheme(t);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, colors: palettes[theme], toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** Convenience accessor for viz code that only needs the active color palette. */
export function useThemeColors(): Palette {
  return useTheme().colors;
}
