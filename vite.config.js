import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'script',
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*'],
        sourcemap: true,
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: ['**/*'],
      manifest: {
        name: 'Retangulo.org',
        short_name: 'Retangulo.org',
        description:
          'O Retangulo.org é uma plataforma de exercícios matemáticos projetada para desafiar suas habilidades de cálculo. Melhore suas habilidades de resolução de cálculo mental e resolva as questões o mais rápido possível sem cometer erros. Atualmente, o Retangulo.org, conta com a possibilidade de gerar cálculos aleatórios com ou sem negativo nas seguintes operações matemáticas: adição, subtração, divisão, multiplicação, raiz quadrada, expoente 2 e expoente 3.',
        display: 'standalone',
        id: '/gerador',
        lang: 'ptbr',
        start_url: '/gerador',
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
