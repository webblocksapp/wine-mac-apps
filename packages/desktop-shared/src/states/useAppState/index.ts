import { createStore } from 'solid-js/store';
import { AppState } from '@interfaces';

const [store, setStore] = createStore<AppState>({
  env: { HOME: '', BASH_SCRIPTS_PATH: '', STUBS_PATH: '' },
  initializingEnv: false,
});

export const useAppState = () => {
  const initEnv = (env: AppState['env']) => {
    setStore('env', env);
  };

  const initializingEnv = (flag: boolean) => {
    setStore('initializingEnv', flag);
  };

  return { initEnv, initializingEnv, store };
};
