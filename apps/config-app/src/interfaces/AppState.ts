import { AppState as BaseAppState, WineApp } from 'desktop-shared';

export type AppState = BaseAppState & {
  config: WineApp;
  initializingConfig: boolean;
  updatingConfig: boolean;
};
