import { BashScript } from '@interfaces';

export type BashScriptArgs = Record<BashScript, {}> & {
  wineAppContentsPath: 'dev' | 'prod';
};
