import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "components": path.resolve(__dirname, "src/components"),
      "constants": path.resolve(__dirname, "src/constants"),
      "style": path.resolve(__dirname, "src/style"),
      "types": path.resolve(__dirname, "src/types"),
      "utils": path.resolve(__dirname, "src/utils"),
    }
  }
});
