import { Component } from 'solid-js';
import { useEnvState } from '@states';
import { homeDir } from '@tauri-apps/api/path';
import { useRoutes } from '@solidjs/router';
import { routes } from '@routes';
import { useWineEngineModel } from '@models';

export const App: Component = () => {
  const wineEngineModel = useWineEngineModel();

  const initEnv = async () => {
    const HOME = (await homeDir()).replace(/\/$/, '');
    const WINE_BASE_FOLDER = `${HOME}/Wine`;
    const WINE_ENGINES_FOLDER = `${WINE_BASE_FOLDER}/engines`;
    const WINE_APPS_FOLDER = `${WINE_BASE_FOLDER}/apps`;
    const { setEnvState } = useEnvState();

    setEnvState({
      HOME: (await homeDir()).replace(/\/$/, ''),
      WINE_BASE_FOLDER,
      WINE_ENGINES_FOLDER,
      WINE_APPS_FOLDER,
    });
  };

  const appSetup = () => {
    Promise.all([initEnv(), wineEngineModel.list()]);
  };

  appSetup();

  return useRoutes(routes);
};
