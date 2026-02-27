import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/cuatro-bet/' : '/',
  server: {
    host: true,
    port: 5174
  }
}))