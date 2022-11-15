import { mapFlags, useAppEnv, useShellRunner } from '@utils';
import { WineAppConfig } from '@interfaces';
import { createWineAppPipeline, runWineCfgScript } from '@shell';

export const useWineApp = (config: WineAppConfig) => {
  const appEnv = useAppEnv(config);
  const { consoleOutput, runPipeline, runScript, pipeline } = useShellRunner({
    ...config,
    appEnv,
  });

  /**
   * Creates a copy of the wine version from the engine
   * for the app to work standalone.
   */
  const createWineApp = async () => {
    return runPipeline(createWineAppPipeline);
  };

  /**
   * Opens winecfg ui.
   */
  const winecfg = async () => {
    runScript(runWineCfgScript);
  };

  /**
   * Runs winetricks
   */
  const winetricks = async (
    tricks: string[],
    options?: { silent?: boolean; force?: boolean }
  ) => {
    options = { silent: true, force: true, ...options };
    const flags = mapFlags(options, { silent: '-q', force: '--force' });
    await runScript(
      `{{WINE_APP_EXPORT_PATH}} WINEPREFIX={{WINE_APP_FOLDER}} winetricks ${tricks.join(
        ' '
      )} ${flags}`
    );
  };

  return {
    createWineApp,
    winecfg,
    winetricks,
    consoleOutput,
    pipeline,
  };
};
