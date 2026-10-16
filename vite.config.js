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
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/*.mp4', '**/*.mov'],
    },
  },
})
