import { Component } from 'solid-js';
import { setEnvState } from '@states';
import { homeDir } from '@tauri-apps/api/path';
import { useRoutes } from '@solidjs/router';
import { routes } from '@routes';

export const App: Component = () => {
  const initEnv = async () => {
    const HOME = (await homeDir()).replace(/\/$/, '');
    const WINE_BASE_FOLDER = `${HOME}/Wine`;
    const WINE_ENGINES_FOLDER = `${WINE_BASE_FOLDER}/engines`;
    const WINE_APPS_FOLDER = `${WINE_BASE_FOLDER}/apps`;

    setEnvState({
      HOME: (await homeDir()).replace(/\/$/, ''),
      WINE_BASE_FOLDER,
      WINE_ENGINES_FOLDER,
      WINE_APPS_FOLDER,
    });
  };

  initEnv();

  return useRoutes(routes);
};
