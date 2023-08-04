import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import { VitePWA } from 'vite-plugin-pwa';
import vitePluginRequire from 'vite-plugin-require';
import resolve from 'vite-plugin-resolve';

const proxyUrl = 'http://localhost:4000/';

// https://vitejs.dev/config/
export default defineConfig((params) => {

  const isProduction = params.mode === 'production';

  return {
    plugins: [
      react(),
      // VitePWA(),
      // @ts-ignore
      vitePluginRequire.default(),
      isProduction ? resolve({
        './local.config': `
          export default {};
        `,
      }) : null,
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
          target: proxyUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
