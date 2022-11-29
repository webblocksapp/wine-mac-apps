import { Id, WineEngine } from '@interfaces';

export type WineApp = {
  id?: Id;
  name: string;
  engine: WineEngine;
  setupExecutablePath: string;
  winetricksVerbs?: string[];
  dxvkEnabled: boolean;
};
