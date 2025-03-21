import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "dod-warning",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(), 
    dts(
      { 
        rollupTypes: true,
        insertTypesEntry: true
      }
    ),
    libInjectCss()
  ],
  css: {
    postcss: {
      plugins: [],
    },
  },
});