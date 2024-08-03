import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  base: process.env.NODE_ENV === 'production'
    ? '/Portfolio/'
    : '/',
})
