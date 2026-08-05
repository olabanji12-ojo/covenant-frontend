import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectManifest: {
        swDest: 'dist/sw.js',
      },
      manifest: {
        name: 'Church Match',
        short_name: 'Church Match',
        description: 'Find your Christian match today.',
        theme_color: '#f7f5f0',
        background_color: '#f7f5f0',
        display: 'standalone',
        icons: [
          {
            src: '/Cross.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/Cross.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000, // You can change this if 3000 is taken
    open: true, // Optional: Opens the browser automatically
  },
})
