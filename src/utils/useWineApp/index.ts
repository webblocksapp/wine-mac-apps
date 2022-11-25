import { mapFlags, useShellRunner } from '@utils';
import { WineAppConfig } from '@interfaces';
import {
  createWineAppScript,
  extractWineEngineScript,
  generateWinePrefixScript,
  runWineCfgScript,
} from '@scripts';
import { useAppModel } from '@models';

export const useWineApp = (config: WineAppConfig) => {
  const appModel = useAppModel();
  const env = appModel.selectEnv();

  /**
   * Initializes the env paths.
   */
  const initEnv = () => {
    const HOME = env().HOME;
    const WINE_BASE_FOLDER = `${HOME}/Wine`;
    const WINE_ENGINES_FOLDER = `${WINE_BASE_FOLDER}/engines`;
    const WINE_APPS_FOLDER = `${WINE_BASE_FOLDER}/apps`;
    const WINE_APP_FOLDER = `${WINE_APPS_FOLDER}/${config.appName}`;
    const WINE_APP_BIN_PATH = `${WINE_APP_FOLDER}/wine/bin`;
    const WINE_APP_EXPORT_PATH = `PATH="${WINE_APP_BIN_PATH}:$PATH"`;
    const WINE_ENGINE_VERSION = config.engine.version;

    return {
      HOME,
      WINE_BASE_FOLDER,
      WINE_ENGINES_FOLDER,
      WINE_APPS_FOLDER,
      WINE_APP_FOLDER,
      WINE_APP_BIN_PATH,
      WINE_APP_EXPORT_PATH,
      WINE_ENGINE_VERSION,
    };
  };

  const { consoleOutput, runPipeline, runScript, pipeline } = useShellRunner({
    env: initEnv(),
  });

  /**
   * Creates a copy of the wine version from the engine
   * for the app to work standalone.
   */
  const createWineApp = (options?: { winetricks?: string[] }) => {
    return runPipeline({
      name: 'Create wine app - Workflow',
      jobs: [
        {
          name: 'Create wine app - Job',
          steps: [
            {
              name: 'Creating wine app folder',
              script: createWineAppScript,
            },
            {
              name: 'Extracting wine engine',
              script: extractWineEngineScript,
            },
            {
              name: 'Generating wine prefix',
              script: generateWinePrefixScript,
            },
          ],
        },
      ],
    });
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

  /**
   * Executes a program through wine.
   */
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
