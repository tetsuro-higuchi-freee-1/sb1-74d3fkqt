import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/rest/api': {
          target: 'https://jira-freee.atlassian.net',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/rest\/api/, '/rest/api'),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization'
          }
        }
      }
    },
    build: {
      // Use environment variable for output directory, fallback to 'dist'
      outDir: env.VITE_BUILD_OUTDIR || 'dist',
      // Ensure clean build
      emptyOutDir: true,
      // Generate sourcemaps for production build
      sourcemap: true,
      // Optimize chunk size
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['lucide-react']
          }
        }
      }
    }
  };
});