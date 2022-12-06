import {
  Id,
  WineAppExecutable,
  WineEngine,
  WinetricksOptions,
} from '@interfaces';

export type WineApp = {
  id?: Id;
  name: string;
  engine: WineEngine;
  setupExecutablePath: string;
  winetricks: { verbs: string[]; options: WinetricksOptions };
  dxvkEnabled: boolean;
  executables: Array<WineAppExecutable>;
};
