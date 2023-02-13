import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: '../../server/public',
  },
  plugins: [
    react(),
    VitePluginFonts({
      custom: {
        families: [
          {
            name: 'card-rank',
            local: 'card-rank',
            src: './src/assets/fonts/card-rank.woff',
          },
          {
            name: 'card-suit',
            local: 'card-suit',
            src: './src/assets/fonts/card-suit.woff',
          },
        ],
        preload: true,
        display: 'block',
      },
      google: {
        families: [
          {
            name: 'Poppins',
            styles: 'wght@500;600;700;800;900',
          },
        ],
        preconnect: true,
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      // strategies: 'injectManifest',
      // srcDir: 'src',
      // filename: 'sw.js',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'MaxiPoker',
        short_name: 'MaxiPoker',
        description: 'Online poker',
        start_url: "/?fullscreen=true",
        theme_color: '#000',
        display: 'fullscreen',
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
    }),
  ],
})
