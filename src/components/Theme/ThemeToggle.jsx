import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Monitor, Moon, Sun } from 'lucide-react';
import Button from '../Button';

export default function DarkModeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();

  return (
    <div className={` relative py-2 px-2 bg-secundary flex flex-row rounded-md`}>
      <Button size="icon" onClick={() => setIsOpen(!isOpen)}>
        {localStorage.getItem('vite-ui-theme') === null ? (
          <Monitor />
        ) : localStorage.getItem('vite-ui-theme') === 'light' ? (
          <Sun />
        ) : localStorage.getItem('vite-ui-theme') === 'dark' ? (
          <Moon />
        ) : (
          <Monitor />
        )}
      </Button>
      {isOpen && (
        <div className="absolute top-0 p-2 left-0 flex flex-col gap-2 bg-secundary rounded-md">
          <Button
            size="icon"
            variant={
              localStorage.getItem('vite-ui-theme') === null
                ? 'primary'
                : localStorage.getItem('vite-ui-theme') === 'system'
                  ? 'primary'
                  : 'default'
            }
            onClick={() => {
              setTheme('system');
              setIsOpen(!isOpen);
            }}>
            <Monitor />
          </Button>
          <Button
            size="icon"
            variant={localStorage.getItem('vite-ui-theme') === 'dark' ? 'primary' : 'default'}
            onClick={() => {
              setTheme('dark');
              setIsOpen(!isOpen);
            }}>
            <Moon />
          </Button>
          <Button
            size="icon"
            variant={localStorage.getItem('vite-ui-theme') === 'light' ? 'primary' : 'default'}
            onClick={() => {
              setTheme('light');
              setIsOpen(!isOpen);
            }}>
            <Sun />
          </Button>
        </div>
      )}
    </div>
  );
}
