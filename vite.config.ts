import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Needed for MobX decorators
    include: [
      'mobx',
      'mobx-keystone',
      'mobx-react-lite'
    ]
  },
  esbuild: {
    // Enable decorators
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true
      }
    }
  }
})