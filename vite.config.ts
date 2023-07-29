import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import vitePluginRequire from 'vite-plugin-require';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(),
    vitePluginRequire.default(),
  ],
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src/shared'),
      desktop: path.resolve(__dirname, 'src/desktop'),
      mobile: path.resolve(__dirname, 'src/mobile'),
    },
  },
});
