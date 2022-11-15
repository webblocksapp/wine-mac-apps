import { WineAppConfig } from '@interfaces';
import { envState } from '@states';
import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

export const useAppEnv = (config: WineAppConfig) => {
  const [appEnv, setAppEnv] = createStore({
    ...envState,
    WINE_APP_FOLDER: '',
    WINE_APP_BIN_PATH: '',
    WINE_APP_EXPORT_PATH: '',
    WINE_ENGINE_VERSION: '',
  });

  createEffect(() => {
    const WINE_APP_FOLDER = `${envState.WINE_APPS_FOLDER}/${config.appName}`;
    const WINE_APP_BIN_PATH = `${WINE_APP_FOLDER}/wine/bin`;
    const WINE_APP_EXPORT_PATH = `PATH="${WINE_APP_BIN_PATH}:$PATH"`;
    const WINE_ENGINE_VERSION = config.engine;

    setAppEnv({
      ...envState,
      WINE_APP_FOLDER,
      WINE_APP_BIN_PATH,
      WINE_APP_EXPORT_PATH,
      WINE_ENGINE_VERSION,
    });
  });

  return appEnv;
};
