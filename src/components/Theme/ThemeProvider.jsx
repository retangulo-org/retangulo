import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme') || 'system';
    return saved;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      let activeTheme = theme;
      if (theme === 'system') {
        activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      root.classList.toggle('dark', activeTheme === 'dark');
    };

    apply();
    localStorage.setItem('theme', theme);

    const listener = () => theme === 'system' && apply();

    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
