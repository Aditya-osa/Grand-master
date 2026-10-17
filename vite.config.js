import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcFavicon = path.resolve(__dirname, 'src/assets/Favicon.png')
const publicFavicon = path.resolve(__dirname, 'public/favicon.png')
const publicFaviconUpper = path.resolve(__dirname, 'public/Favicon.png')

try {
  if (fs.existsSync(srcFavicon)) {
    fs.copyFileSync(srcFavicon, publicFavicon)
    fs.copyFileSync(srcFavicon, publicFaviconUpper)
  }
} catch (e) {
  // ignore
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'sendmail-dev-mock',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/sendmail.php' && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => {
              body += chunk
            })
            req.on('end', () => {
              let data = {}
              try {
                data = JSON.parse(body)
              } catch (_) {
                data = Object.fromEntries(new URLSearchParams(body))
              }

              console.log('\n==================================================')
              console.log('📬 [GRAND MASTER CONTACT FORM - LOCAL TEST]')
              console.log(`👤 Name:    ${data.name || (data.firstName + ' ' + data.lastName)}`)
              console.log(`📧 Email:   ${data.email}`)
              console.log(`💬 Message: ${data.message || data.comment}`)
              console.log(`🎯 Target:  mail@Grandmasters.co`)
              console.log('✅ Status:   Success (No activation permission needed)')
              console.log('==================================================\n')

              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(
                JSON.stringify({
                  status: 'success',
                  success: true,
                  message: "We've received your information",
                })
              )
            })
            return
          }
          next()
        })
      },
    },
  ],
  server: {
    watch: {
      ignored: ['**/*.mp4', '**/*.mov'],
    },
  },
})
