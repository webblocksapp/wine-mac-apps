import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**'],
  format: ['esm'],
  clean: true,
  bundle: false,
  dts: true,
  outExtension() {
    return {
      js: '.jsx',
    };
  },
  esbuildOptions(options) {
    options.assetNames = 'public/[name]';
  },
  loader: {
    '.svg': 'file',
  },
});
