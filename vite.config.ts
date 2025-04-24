import path from 'path';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vitePluginRequire from 'vite-plugin-require';
import resolve from 'vite-plugin-resolve';

const proxyUrl = 'http://localhost:4000/';

// https://vitejs.dev/config/
export default defineConfig((params) => {
  const isProduction = params.mode === 'production';
  const buildSentry = !!process.env.SENTRY_AUTH_TOKEN;
  console.log('isProduction', isProduction, params.mode);
  return {
    build: {
      sourcemap: !isProduction, // Source map generation must be turned on
    },
    plugins: [
      preserveDirectives(),
      react(),
      VitePWA({
        // registerType: 'autoUpdate',
        // workbox: {
        //   cleanupOutdatedCaches: true,
        //   clientsClaim: true, // Заменяет старый SW на новый сразу
        //   skipWaiting: true, // Активирует новый SW мгновенно
        // },
        includeAssets: [
          '**/*',
        ],
        workbox: {
          globPatterns: ['**/*.{js,css,html,png}'],
        },
      }),
      // @ts-ignore
      vitePluginRequire.default(),
      isProduction ? resolve({
        './local.config': `
          export default {};
        `,
      }) : null,
      buildSentry ? [sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'dotify',
        project: 'frontend',
      })] : null,
    ],
    resolve: {
      alias: {
        shared: path.resolve(__dirname, './src/shared'),
        desktop: path.resolve(__dirname, './src/desktop'),
        mobile: path.resolve(__dirname, './src/mobile'),
      },
    },
    define: {
      'import.meta.env.MOCK': JSON.stringify(process.env.MOCK),
    },
    server: {
      proxy: {
        '/api': {
          target: proxyUrl + '/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: isProduction ? 'assets/[hash].js' : 'assets/[name]-[hash].js',
        chunkFileNames: isProduction ? 'assets/[hash].js' : 'assets/[name]-[hash].js',
        assetFileNames: isProduction ? 'assets/[hash].[ext]' : 'assets/[name]-[hash].[ext]',
      },
    },
  };
});
