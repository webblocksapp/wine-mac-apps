import { WINE_RESOURCES_PATH } from '@constants';
import { homeDir } from '@tauri-apps/api/path';
import { mapFlags, runScript } from '@utils';

export const useWine = async (config: { appName: string }) => {
  const HOME = `${await homeDir()}`;
  const WINE_APP_FOLDER = `${HOME}/wine-apps/${config.appName}`;
  /**
   * Creates the wine application prefix folder.
   */
  const createWineAppPrefix = async () => {
    await runScript(`mkdir ${HOME}/wine-apps`);
    await runScript(`mkdir ${WINE_APP_FOLDER}`);
    await wineboot();
  };

  /**
   * Runs wine folder scaffolding.
   */
  const wineboot = () => {
    return runScript(`WINEPREFIX=${WINE_APP_FOLDER} wine wineboot`);
  };

  /**
   * Opens winecfg ui.
   */
  const winecfg = () => {
    return runScript(`WINEPREFIX=${WINE_APP_FOLDER} winecfg`);
  };

  /**
   * Opens winecfg ui.
   */
  const winetricks = (
    tricks: string[],
    options?: { silent?: boolean; force?: boolean }
  ) => {
    const START_BIN = `${WINE_RESOURCES_PATH}/start/bin`;
    const WINE_BIN = `${WINE_RESOURCES_PATH}/wine/bin`;

    options = { silent: true, force: true, ...options };
    const flags = mapFlags(options, { silent: '-q', force: '--force' });

    return runScript(
      `PATH="${START_BIN}:${WINE_BIN}:$PATH" WINEPREFIX=${WINE_APP_FOLDER} winetricks ${tricks.join(
        ' '
      )} ${flags}`
    );
  };

  return { createWineAppPrefix, winecfg, winetricks };
};
