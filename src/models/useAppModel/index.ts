import { useAppState } from '@states';
import { homeDir, resolveResource } from '@tauri-apps/api/path';

export const useAppModel = () => {
  const appState = useAppState();

  const initEnv = async () => {
    try {
      appState.initializingEnv(true);
      appState.initEnv({
        HOME: (await homeDir()).replace(/\/$/, ''),
        BASH_SCRIPTS_PATH: await resolveResource('bash'),
        STUBS_PATH: await resolveResource('stubs'),
      });
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
