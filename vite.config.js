import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon.png',
        'favicon.svg',
        'robots.txt',
        'sitemap.xml',
      ],
      manifest: {
        name: 'Matthew Stone',
        short_name: 'Matthew Stone',
        description: 'Matthew Stone personal website with web projects, calculators, weather, and NBA scores.',
        start_url: '/',
        display: 'standalone',
        background_color: '#1c1c21',
        theme_color: '#1c1c21',
        icons: [
          {
            src: '/favicon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,ttf}'],
        navigateFallback: 'index.html',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
  },
  envPrefix: ['VITE_', 'VUE_APP_'],
})
