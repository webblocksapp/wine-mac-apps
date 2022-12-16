import { WineApp } from '@interfaces';

export type AppState = {
  env: {
    HOME: string;
    BASH_SCRIPTS_PATH: string;
    STUBS_PATH: string;
  };
  initializingEnv: boolean;
  cmdArgs: {
    config: WineApp;
    url: string;
  };
};
