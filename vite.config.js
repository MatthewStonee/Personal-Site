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
        'apple-touch-icon.png',
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
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Precache only the app shell; images and fonts are cached the first time a page uses them.
        globPatterns: ['**/*.{js,css,html,woff2}'],
        globIgnores: ['**/node_modules/**/*', 'apartment-walkthrough.html'],
        runtimeCaching: [
          {
            urlPattern: ({ request, sameOrigin }) => sameOrigin && ['image', 'font'].includes(request.destination),
            handler: 'CacheFirst',
            options: {
              cacheName: 'media',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
        navigateFallback: 'index.html',
        // Navigations to real files (the resume PDF) must reach the network instead of the SPA shell.
        navigateFallbackDenylist: [/^\/__\//, /\/[^/?]+\.[^/]+$/],
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
