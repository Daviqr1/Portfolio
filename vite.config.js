import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  base: process.env.NODE_ENV === "production" ? "/Portfolio/" : "/",
})