import { ChildProcess } from '@tauri-apps/api/shell';
import { mapFlags, runScript } from '@utils';
import { createEffect, createSignal } from 'solid-js';
import { envState } from '@states';
import { createStore } from 'solid-js/store';

export const useWine = (config: { appName: string; engine?: string }) => {
  const [childProcess, setChildProcess] = createSignal<ChildProcess>();
  const [env, setEnv] = createStore({
    WINE_APP_FOLDER: '',
    WINE_BIN_PATH: '',
    WINE_EXPORT_PATH: '',
  });
  const [output, setOutput] = createSignal<string | undefined>('');

  const runScripts = async (scripts: string[]) => {
    for (const script of scripts) {
      setChildProcess(await runScript(`echo ${script}`));
      setChildProcess(await runScript(script));
    }
  };

  /**
   * Creates a copy of the wine version from the engine
   * for the app to work standalone.
   */
  const buildWineForApp = async () => {
    runScripts([
      `mkdir -p ${env.WINE_APP_FOLDER}`,
      `mkdir -p ${env.WINE_APP_FOLDER}/wine`,
      `tar -xf ${envState.WINE_ENGINES_FOLDER}/${config.engine}.tar.7z -C ${env.WINE_APP_FOLDER} -v`,
      `mv ${env.WINE_APP_FOLDER}/wswine.bundle/* ${env.WINE_APP_FOLDER}/wine`,
      `rm -r ${env.WINE_APP_FOLDER}/wswine.bundle`,
      `${env.WINE_EXPORT_PATH} WINEPREFIX=${env.WINE_APP_FOLDER} wine32on64 wineboot`,
    ]);
  };

  /**
   * Opens winecfg ui.
   */
  const winecfg = async () => {
    setChildProcess(
      await runScript(
        `${env.WINE_EXPORT_PATH} WINEPREFIX=${env.WINE_APP_FOLDER} wine32on64 winecfg`
      )
    );
  };

  /**
   * Opens winecfg ui.
   */
  const winetricks = async (
    tricks: string[],
    options?: { silent?: boolean; force?: boolean }
  ) => {
    options = { silent: true, force: true, ...options };
    const flags = mapFlags(options, { silent: '-q', force: '--force' });

    setChildProcess(
      await runScript(
        `${env.WINE_EXPORT_PATH} WINEPREFIX=${
          env.WINE_APP_FOLDER
        } winetricks ${tricks.join(' ')} ${flags}`
      )
    );
  };

  const printStdout = () => {
    return childProcess()?.stdout ? `\n${childProcess()?.stdout}` : '';
  };

  const printStderr = () => {
    return childProcess()?.stderr ? `\n${childProcess()?.stderr}` : '';
  };

  createEffect(() => {
    setEnv('WINE_APP_FOLDER', `${envState.WINE_APPS_FOLDER}/${config.appName}`);
    setEnv('WINE_BIN_PATH', `${env.WINE_APP_FOLDER}/wine/bin`);
    setEnv('WINE_EXPORT_PATH', `PATH="${env.WINE_BIN_PATH}:$PATH"`);
  });

  createEffect(() => {
    setOutput((prev) => `${prev}${printStdout()}${printStderr()}`);
  });

  return {
    buildWineForApp,
    winecfg,
    winetricks,
    childProcess,
    output,
  };
};
