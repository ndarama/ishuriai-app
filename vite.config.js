import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Ishuri clone application.  This configuration
// enables React support via the official plugin and leaves the rest of the
// settings at their sensible defaults.  Additional configuration options
// (such as aliasing or environment variable handling) can be added here
// depending on your deployment needs.

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    open: true
  }
});