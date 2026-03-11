import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // 👈 Na Vercel, o site fica na raiz, então usamos "/"
  build: {
    outDir: 'dist', // Pasta padrão de saída
  }
});