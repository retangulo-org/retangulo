import React from 'react';
import { useTheme } from './ThemeProvider';
import { Monitor, Moon, Sun } from 'lucide-react';
import Button from '../Button';

export default function DarkModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-row gap-2">
      <Button
        variant={localStorage.getItem('vite-ui-theme') === 'light' ? 'outline' : 'default'}
        size="icon"
        onClick={() => setTheme('light')}>
        <Sun />
      </Button>
      <Button
        variant={localStorage.getItem('vite-ui-theme') === 'dark' ? 'outline' : 'default'}
        size="icon"
        onClick={() => setTheme('dark')}>
        <Moon />
      </Button>
      <Button
        variant={localStorage.getItem('vite-ui-theme') === 'system' ? 'outline' : 'default'}
        size="icon"
        onClick={() => setTheme('system')}>
        <Monitor />
      </Button>
    </div>
  );
}
