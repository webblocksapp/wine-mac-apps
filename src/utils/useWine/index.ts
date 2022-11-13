import { homeDir } from '@tauri-apps/api/path';
import { mkdir, winecfg } from '@utils';

export const useWine = async (config: { appName: string }) => {
  const WINE_APP_FOLDER = `${await homeDir()}/wine-apps/${config.appName}`;
  /**
   * Creates the wine application prefix folder.
   */
  const createWineAppPrefix = async () => {
    await mkdir(WINE_APP_FOLDER);
    await runWinecfg();
  };

  const runWinecfg = async () => {
    await winecfg(`WINEPREFIX=${WINE_APP_FOLDER}`);
  };

  return { createWineAppPrefix };
};
