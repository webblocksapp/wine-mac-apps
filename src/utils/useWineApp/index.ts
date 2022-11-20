import { mapFlags, useAppEnv, useShellRunner } from '@utils';
import { WineAppConfig } from '@interfaces';
import { createWineAppPipeline, runWineCfgScript } from '@shell';

export const useWineApp = (config: WineAppConfig) => {
  const appEnv = useAppEnv(config);
  const { consoleOutput, runPipeline, runScript, pipeline } = useShellRunner({
    env: appEnv,
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
    options?: { silent?: boolean; force?: boolean; onlyEcho?: boolean }
  ) => {
    options = { silent: true, force: true, ...options };
    const flags = mapFlags(options, { silent: '-q', force: '--force' });

    for (let trick of tricks) {
      await runScript(
        `{{WINE_APP_EXPORT_PATH}} WINEPREFIX={{WINE_APP_FOLDER}} WINE={{WINE_APP_BIN_PATH}}/wine32on64 winetricks ${trick} ${flags}`,
        { force: true, onlyEcho: options?.onlyEcho }
      );
    }
  };

  const runProgram = async (
    executablePath: string,
    exeFlags: string[] = [],
    options?: { onlyEcho?: boolean }
  ) => {
    exeFlags = exeFlags?.map?.((item) => `"${item}"`);
    await runScript(
      `{{WINE_APP_EXPORT_PATH}} WINEPREFIX={{WINE_APP_FOLDER}} exec wine32on64 "{{WINE_APP_FOLDER}}/${executablePath}" ${exeFlags.join(
        ' '
      )}`,
      { onlyEcho: options?.onlyEcho }
    );
  };

  return {
    createWineApp,
    winecfg,
    winetricks,
    consoleOutput,
    pipeline,
    runProgram,
  };
};
