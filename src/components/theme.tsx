import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";
const THEME_EVENT = "ndopflix-theme-change";

const isTheme = (value: string | null): value is Theme => value === "light" || value === "dark";

const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (isTheme(savedTheme)) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;

      if (isTheme(nextTheme)) {
        setTheme(nextTheme);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== THEME_STORAGE_KEY) {
        return;
      }

      if (isTheme(event.newValue)) {
        setTheme(event.newValue);
      }
    };

    window.addEventListener(THEME_EVENT, handleThemeChange as EventListener);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(THEME_EVENT, handleThemeChange as EventListener);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return {
    theme,
    isDark: theme === "dark",
    toggleTheme,
  };
}

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`rounded-full border p-2 transition-colors duration-200 ${
        isDark
          ? "border-slate-700 bg-slate-900 text-amber-300 hover:bg-slate-800"
          : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
