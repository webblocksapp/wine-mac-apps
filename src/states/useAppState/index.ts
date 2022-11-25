import { createStore } from 'solid-js/store';
import { AppState } from '@interfaces';

const [store, setStore] = createStore<AppState>({
  env: { HOME: '' },
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
