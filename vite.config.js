import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      }
    }
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.svg'],
  base: process.env.NODE_ENV === "production" ? "/Portfolio/" : "/",
})
