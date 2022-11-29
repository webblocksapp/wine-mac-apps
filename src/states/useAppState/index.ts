import { createStore } from 'solid-js/store';
import { AppState } from '@interfaces';

const [store, setStore] = createStore<AppState>({
  env: { HOME: '', BASH_SCRIPTS_PATH: process.env.bashScriptsPath || '' },
  initializingEnv: false,
});

export const useAppState = () => {
  const initEnv = (env: typeof store.env) => {
    setStore('env', env);
  };

  const initializingEnv = (flag: boolean) => {
    setStore('initializingEnv', flag);
  };

  return { initEnv, initializingEnv, store };
};
