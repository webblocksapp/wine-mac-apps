import { dtsPlugin } from 'esbuild-plugin-d.ts';
import { globPlugin } from 'esbuild-plugin-glob';
import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';

build({
  entryPoints: ['src/**/*'],
  bundle: false,
  outdir: 'dist',
  format: 'esm',
  plugins: [
    dtsPlugin({ outDir: 'dist/src' }),
    clean({
      patterns: ['./dist/*'],
    }),
    globPlugin(),
  ],
  loader: {
    '.png': 'file',
    '.svg': 'file',
  },
  outbase: './',
  outExtension: { '.js': '.jsx' },
});
