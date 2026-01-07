import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REPLACE 'repo-name' WITH YOUR EXACT GITHUB REPOSITORY NAME
  // Example: If your repo is at github.com/junaid/my-portfolio, this should be '/my-portfolio/'
  base: '/portfolio.github.io/', 
})
