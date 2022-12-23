import { dtsPlugin } from 'esbuild-plugin-d.ts';
import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';
import { globPlugin } from 'esbuild-plugin-glob';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { copy } from 'esbuild-plugin-copy';

build({
  entryPoints: ['src/**/*'],
  external: [],
  bundle: false,
  outdir: 'dist',
  format: 'esm',
  plugins: [
    dtsPlugin(),
    clean({
      patterns: ['./dist/*'],
    }),
    nodeExternalsPlugin({ dependencies: false }),
    globPlugin(),
    copy({ assets: [{ from: './public/**/*', to: './public' }] }),
  ],
  outExtension: { '.js': '.jsx' },
});
