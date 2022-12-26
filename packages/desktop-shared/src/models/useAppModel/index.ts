import { useAppState } from '@states';
import { homeDir, resolveResource } from '@tauri-apps/api/path';
import { exists } from '@tauri-apps/api/fs';

export const useAppModel = () => {
  const appState = useAppState();

  const initEnv = async () => {
    try {
      const BASH_SCRIPTS_PATH = await resolveResource('bash');
      let ENV_SH = `${BASH_SCRIPTS_PATH}/env.sh`;
      ENV_SH = (await exists(ENV_SH)) ? ENV_SH : '';

      appState.initializingEnv(true);
      appState.initEnv({
        HOME: (await homeDir()).replace(/\/$/, ''),
        BASH_SCRIPTS_PATH,
        ENV_SH,
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

  return {
    initEnv,
    selectEnv,
    selectInitializingEnv,
  };
};
