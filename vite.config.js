import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// For GitHub Pages project at https://semrosin.github.io/cv
export default defineConfig({
  base: '/cv/',
  plugins: [tailwindcss(), react()],
})
