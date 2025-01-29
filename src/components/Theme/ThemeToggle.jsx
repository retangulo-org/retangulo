import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import Button from '../Button';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (localStorage.getItem('vite-ui-theme') === '') {
      return false;
    }

    if (localStorage.getItem('vite-ui-theme') === 'light') {
      return false;
    }

    if (localStorage.getItem('vite-ui-theme') === 'dark') {
      return true;
    }
  });

  const { setTheme } = useTheme();

  useEffect(() => {
    if (localStorage.getItem('vite-ui-theme') === 'light') {
      setIsDark(false);
      return setTheme('light');
    }

    if (localStorage.getItem('vite-ui-theme') === 'dark') {
      setIsDark(true);
      return setTheme('dark');
    }

    if (localStorage.getItem('vite-ui-theme') === '') {
      setIsDark(false);
      return setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (isDark === false) {
      setIsDark(false);
      return setTheme('light');
    }

    if (isDark) {
      setIsDark(true);
      return setTheme('dark');
    }
  }, [isDark]);

  return (
    <Button size="icon" name="Mudar tema" onClick={() => setIsDark(!isDark)}>
      {isDark ? <Moon /> : <Sun />}
    </Button>
  );
}
