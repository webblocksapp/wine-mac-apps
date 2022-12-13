import { createStore } from 'solid-js/store';
import { AppState } from '@interfaces';

const [store, setStore] = createStore<AppState>({
  env: { HOME: '', BASH_SCRIPTS_PATH: '', STUBS_PATH: '' },
  initializingEnv: false,
  cmdArgs: {
    config: {
      engine: { url: '', version: '' },
      dxvkEnabled: false,
      executables: [],
      name: '',
      setupExecutablePath: '',
      winetricks: { options: {}, verbs: [] },
    },
    url: '/',
  },
});

export const useAppState = () => {
  const initEnv = (env: AppState['env']) => {
    setStore('env', env);
  };

  const initializingEnv = (flag: boolean) => {
    setStore('initializingEnv', flag);
  };

  const setCmdArgs = (cmdArgs: AppState['cmdArgs']) => {
    setStore('cmdArgs', cmdArgs);
  };

  return { initEnv, initializingEnv, setCmdArgs, store };
};
