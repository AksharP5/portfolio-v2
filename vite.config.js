import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const productionViewsUrl = 'https://portfolio-v2-jade-tau.vercel.app/api/views'

function previewViewCount() {
  return {
    name: 'preview-view-count',
    configureServer(server) {
      server.middlewares.use('/api/views', async (request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'POST') {
          next()
          return
        }

        try {
          const productionResponse = await fetch(productionViewsUrl, { cache: 'no-store' })
          if (!productionResponse.ok) {
            throw new Error(`Production view count returned ${productionResponse.status}`)
          }

          response.statusCode = 200
          response.setHeader('Cache-Control', 'no-store')
          response.setHeader('Content-Type', 'application/json; charset=utf-8')
          response.end(await productionResponse.text())
        } catch (error) {
          server.config.logger.warn(`Prototype view count unavailable: ${error.message}`)
          response.statusCode = 502
          response.setHeader('Content-Type', 'application/json; charset=utf-8')
          response.end(JSON.stringify({ error: 'View count unavailable' }))
        }
      })
    },
  }
}

function prototypeProjectRoutes() {
  return {
    name: 'prototype-project-routes',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const pathname = request.url?.split('?')[0]
        if (/^\/prototypes\/projects(?:\/[^/]+)?\/?$/.test(pathname)) {
          request.url = '/prototypes/'
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), prototypeProjectRoutes(), previewViewCount()],
  server: {
    allowedHosts: [
      'akshars-macbook-pro.taild065ac.ts.net',
      'archlinux.taild065ac.ts.net',
    ],
  },
})
