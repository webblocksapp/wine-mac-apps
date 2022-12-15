import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**'],
  format: ['cjs', 'esm'],
  clean: true,
  bundle: false,
  dts: true,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.jsx' : `.${format}x`,
    };
  },
});
