import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-globe.gl")) {
            return "globe";
          }

          if (id.includes("node_modules/three")) {
            return "three-core";
          }

          if (id.includes("node_modules/chart.js")) {
            return "charts";
          }
        },
      },
    },
  },
});
