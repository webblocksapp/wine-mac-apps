import { ChildProcess } from '@tauri-apps/api/shell';
import { mapFlags, runScript } from '@utils';
import { createEffect, createSignal } from 'solid-js';
import { envState } from '@states';
import { createStore } from 'solid-js/store';

export const useWine = (config: { appName: string; engine?: string }) => {
  const [childProcess, setChildProcess] = createSignal<ChildProcess>();
  const [store, setStore] = createStore({ WINE_APP_FOLDER: '' });
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
      `mkdir -p ${store.WINE_APP_FOLDER}`,
      `mkdir -p ${store.WINE_APP_FOLDER}/wine`,
      `tar -xf ${envState.WINE_ENGINES_FOLDER}/${config.engine}.tar.7z -C ${store.WINE_APP_FOLDER} -v`,
      `tar -xf ${store.WINE_APP_FOLDER}/wswine.bundle -C ${store.WINE_APP_FOLDER}/wine`,
      `rm ${store.WINE_APP_FOLDER}/wswine.bundle`,
    ]);
  };

  /**
   * Creates the wine application prefix folder.
   */
  const createWineAppPrefix = async () => {
    setChildProcess(
      await runScript(
        `${envState.WINE_EXPORT_PATH} WINEPREFIX=${store.WINE_APP_FOLDER} wine32on64 wineboot`
      )
    );
  };

  /**
   * Opens winecfg ui.
   */
  const winecfg = async () => {
    setChildProcess(
      await runScript(
        `${envState.WINE_EXPORT_PATH} WINEPREFIX=${store.WINE_APP_FOLDER} wine32on64 winecfg`
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
        `${envState.WINE_EXPORT_PATH} WINEPREFIX=${
          store.WINE_APP_FOLDER
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
    setStore(
      'WINE_APP_FOLDER',
      `${envState.WINE_APPS_FOLDER}/${config.appName}`
    );
  });

  createEffect(() => {
    setOutput((prev) => `${prev}${printStdout()}${printStderr()}`);
  });

  return {
    buildWineForApp,
    createWineAppPrefix,
    winecfg,
    winetricks,
    childProcess,
    output,
  };
};
