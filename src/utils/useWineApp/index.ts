import { mapFlags, strReplacer, useShellRunner } from '@utils';
import { Env, JobStep, WineAppConfig, WinetricksOptions } from '@interfaces';
import {
  createWineAppFolderScript,
  extractWineEngineScript,
  generateWinePrefixScript,
  runProgramScript,
  runWineCfgScript,
  winetrickScript,
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
    const WINE_APP_FOLDER = `${WINE_APPS_FOLDER}/${config.name}`;
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
  const createWineApp = (options: {
    setupExecutablePath: string;
    exeFlags?: string;
    winetricks?: { verbs?: string[]; options?: WinetricksOptions };
    verbose?: boolean;
  }) => {
    return runPipeline({
      name: 'Create wine app - Workflow',
      jobs: [
        {
          name: 'Create wine app - Job',
          steps: [
            {
              name: 'Creating wine app folder',
              script: createWineAppFolderScript,
              options: { echo: true },
            },
            {
              name: 'Extracting wine engine',
              script: extractWineEngineScript,
            },
            {
              name: 'Generating wine prefix',
              script: generateWinePrefixScript,
            },
            ...(options?.winetricks?.verbs?.length
              ? generateWinetricksSteps(
                  options.winetricks.verbs,
                  options.winetricks.options
                )
              : []),
            {
              name: 'Running setup executable',
              script: strReplacer<Env>(runProgramScript, {
                EXE_PATH: options.setupExecutablePath,
                EXE_FLAGS: options.exeFlags,
              }),
              options: { echo: true },
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
   * Generates winetricks steps for pipeline.
   */
  const generateWinetricksSteps = (
    tricks: string[],
    options?: WinetricksOptions
  ) => {
    options = { unattended: true, force: true, ...options };
    const flags = mapFlags(options, {
      unattended: '--unattended',
      force: '--force',
    });
    const steps: JobStep[] = [];

    for (let trick of tricks) {
      steps.push({
        name: `Running winetrick ${trick}`,
        script: winetrickScript,
        options: {
          env: {
            WINE_TRICK: trick,
            WINE_TRICK_FLAGS: flags,
          },
          echo: options.echo,
        },
      });
    }

    return steps;
  };

  /**
   * Runs winetricks
   */
  const winetricks = async (tricks: string[], options?: WinetricksOptions) => {
    options = { unattended: true, force: true, ...options };
    const flags = mapFlags(options, {
      unattended: '-unattended',
      force: '--force',
    });

    for (let trick of tricks) {
      await runScript(winetrickScript, {
        force: true,
        echo: options?.echo,
        env: { WINE_TRICK: trick, WINE_TRICK_FLAGS: flags },
      });
    }
  };

  /**
   * Executes a program through wine.
   */
  const runProgram = async (
    executablePath: string,
    exeFlags: string[] = [],
    options?: { echo?: boolean }
  ) => {
    exeFlags = exeFlags?.map?.((item) => `"${item}"`);
    await runScript(
      `{{WINE_APP_EXPORT_PATH}} WINEPREFIX={{WINE_APP_FOLDER}} exec wine32on64 "{{WINE_APP_FOLDER}}/${executablePath}" ${exeFlags.join(
        ' '
      )}`,
      { echo: options?.echo }
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
