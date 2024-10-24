import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*'],
        cleanupOutdatedCaches: false,
      },
      includeAssets: ['**/*'],
      manifest: {
        name: 'Retangulo.org',
        short_name: 'Retangulo.org',
        description:
          'O Retangulo.org é uma plataforma de exercícios matemáticos projetada para desafiar suas habilidades de cálculo. Melhore suas habilidades de resolução de cálculo mental e resolva as questões o mais rápido possível sem cometer erros. Atualmente, o Retangulo.org, conta com a possibilidade de gerar cálculos aleatórios com ou sem negativo nas seguintes operações matemáticas: adição, subtração, divisão, multiplicação, raiz quadrada, expoente 2 e expoente 3.',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        theme_color: '#2563EB',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
