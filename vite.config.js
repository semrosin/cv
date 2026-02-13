import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Site is served from the domain root (e.g. https://semrosin.ru)
// so we keep assets relative to "/" without an extra "/cv" prefix.
export default defineConfig({
  base: "/",
  plugins: [tailwindcss(), react()],
});
