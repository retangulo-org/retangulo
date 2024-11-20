import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ThemeProvider from '../components/Theme/ThemeProvider';
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Nova versão disponível. Deseja atualizar?")) {
      updateSW(true)
    } else {
      updateSW(false)
    }
  },
  onOfflineReady() {
    console.log('App pronto para uso offline!');
  },
})

export default function Root() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <main className="flex justify-center w-full p-5 bg-neutral-100 dark:bg-neutral-950">
        <div className="w-full sm:max-w-3xl">
          <Outlet />
        </div>
      </main>
    </ThemeProvider>
  );
}
