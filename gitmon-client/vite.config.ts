import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "/src/components"),
      "@layouts": path.resolve(__dirname, "/src/layouts"),
      "@pages": path.resolve(__dirname, "/src/pages"),
      "@styles": path.resolve(__dirname, "/src/styles"),
      "@assets": path.resolve(__dirname, "/src/assets"),
      "@types": path.resolve(__dirname, "/src/types"),
      "@hooks": path.resolve(__dirname, "/src/hooks"),
    },
  },
});
