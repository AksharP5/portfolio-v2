import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        prototypes: 'prototypes/index.html',
      },
    },
  },
  server: {
    allowedHosts: ['akshars-macbook-pro.taild065ac.ts.net'],
  },
})
