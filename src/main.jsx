import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import faviconUrl from './assets/Favicon.png'

const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
link.type = 'image/png'
link.rel = 'icon'
link.href = faviconUrl
if (!link.parentNode) {
  document.head.appendChild(link)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
