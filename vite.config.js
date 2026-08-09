import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['akshars-macbook-pro.taild065ac.ts.net'],
  },
})
