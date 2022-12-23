import { WineAppExecutable, WineEngine, WinetricksOptions } from '@interfaces';
import { Id } from 'www-shared';

export type WineApp = {
  id?: Id;
  name: string;
  engine: WineEngine;
  setupExecutablePath: string;
  winetricks: { verbs: string[]; options: WinetricksOptions };
  dxvkEnabled: boolean;
  executables: Array<WineAppExecutable>;
};
