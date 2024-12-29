import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    https: {
      key: fs.readFileSync('./cert/cert/key.pem'),  // Path to your private key
      cert: fs.readFileSync('./cert/cert/cert.pem'), // Path to your certificate
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // you can replace this port with any port
  }
})