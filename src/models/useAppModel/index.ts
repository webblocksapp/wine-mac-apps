import { useAppState } from '@states';
import { homeDir } from '@tauri-apps/api/path';

export const useAppModel = () => {
  const appState = useAppState();

  const initEnv = async () => {
    try {
      appState.initializingEnv(true);
      appState.initEnv({ HOME: (await homeDir()).replace(/\/$/, '') });
    } finally {
      appState.initializingEnv(false);
    }
  };

  const selectEnv = () => {
    return () => appState.store.env;
  };

  const selectInitializingEnv = () => {
    return () => appState.store.initializingEnv;
  };

  return { initEnv, selectEnv, selectInitializingEnv };
};
