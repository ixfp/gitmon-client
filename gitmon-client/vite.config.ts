import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@styles": "/src/styles",
      "@assets": "/src/assets",
      "@types": "/src/types",
      "@hooks": "/src/hooks",
    },
  },
});
