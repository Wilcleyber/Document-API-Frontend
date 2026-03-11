import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Document-API-Frontend/", // 👈 nome exato do repositório
});
