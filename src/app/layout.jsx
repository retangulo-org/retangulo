import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ThemeProvider from '../components/Theme/ThemeProvider';

export default function Root() {
  return (
    <ThemeProvider>
      <Header />
      <main className="flex justify-center w-full p-4">
        <div className="w-full sm:max-w-[720px]">
          <Outlet />
        </div>
      </main>
    </ThemeProvider>
  );
}
