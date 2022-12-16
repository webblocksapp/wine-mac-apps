import { dtsPlugin } from 'esbuild-plugin-d.ts';
import { globPlugin } from 'esbuild-plugin-glob';
import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';
import { copy } from 'esbuild-plugin-copy';

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
    copy({ assets: [{ from: './public/**/*', to: './public' }] }),
  ],
  outbase: './',
  outExtension: { '.js': '.jsx' },
});
