import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import Button from '../Button';

export default function DarkModeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (localStorage.getItem('vite-ui-theme') === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')    
    }
  }, [isOpen])

  return (
    <Button size="icon" onClick={() => setIsOpen(!isOpen)}>
      {localStorage.getItem('vite-ui-theme') === 'light' ? <Sun /> : <Moon />}
    </Button>
  );
}
