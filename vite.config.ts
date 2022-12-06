import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [solidPlugin(), viteTsConfigPaths()],
    clearScreen: false,
    server: {
      port: 1420,
      strictPort: true,
    },
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      target: ['es2021', 'chrome100', 'safari13'],
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      sourcemap: !!process.env.TAURI_DEBUG,
    },
    define: {
      'process.env.bashScriptsPath': JSON.stringify(
        process.cwd() + '/resources/bash/'
      ),
    },
  };
});
