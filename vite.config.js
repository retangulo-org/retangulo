import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'script' | 'script-defer',
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: ['**/*'],
      manifest: {
        name: 'Retangulo.org',
        short_name: 'Retangulo.org',
        description:
          'O Retangulo.org é uma plataforma de exercícios matemáticos projetada para desafiar suas habilidades de cálculo. Melhore suas habilidades de resolução de cálculo mental e resolva as questões o mais rápido possível sem cometer erros.',
        display: 'standalone',
        id: '/',
        lang: 'ptbr',
        start_url: '/',
        theme_color: '#2563EB',
        orientation: 'natural',
        icons: [
          {
            src: '/apple-icon-180x180.png',
            sizes: '180x180',
          },
          {
            src: '/android-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
