import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "/src/components"),
      "@layouts": path.resolve(__dirname, "/src/layouts"),
      "@pages": path.resolve(__dirname, "/src/pages"),
      "@styles": path.resolve(__dirname, "/src/styles"),
      "@assets": path.resolve(__dirname, "/src/assets"),
      "@hooks": path.resolve(__dirname, "/src/hooks"),
    },
  },
});
