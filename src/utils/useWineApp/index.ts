import { useShellRunner } from '@utils';
import { JobStep, WineAppConfig, WinetricksOptions } from '@interfaces';
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
    const WINE_APP_CONTENTS = `${WINE_APP_FOLDER}/Contents`;
    const WINE_APP_SHARED_SUPPORT_PATH = `${WINE_APP_CONTENTS}/SharedSupport`;
    const WINE_APP_LOGS_PATH = `${WINE_APP_SHARED_SUPPORT_PATH}/Logs`;
    const WINE_APP_ENGINE_PATH = `${WINE_APP_SHARED_SUPPORT_PATH}/wine`;
    const WINE_APP_PREFIX_PATH = `${WINE_APP_SHARED_SUPPORT_PATH}/prefix`;
    const WINE_APP_BIN_PATH = `${WINE_APP_ENGINE_PATH}/bin`;
    const WINE_ENGINE_VERSION = config.engine.version;

    return {
      HOME,
      WINE_BASE_FOLDER,
      WINE_ENGINES_FOLDER,
      WINE_APPS_FOLDER,
      WINE_APP_FOLDER,
      WINE_APP_SHARED_SUPPORT_PATH,
      WINE_APP_LOGS_PATH,
      WINE_APP_ENGINE_PATH,
      WINE_APP_PREFIX_PATH,
      WINE_APP_BIN_PATH,
      WINE_ENGINE_VERSION,
    };
  };

  const { buildPipeline, runBashScript } = useShellRunner({
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
  }) => {
    const winetricksSteps = generateWinetricksSteps(
      options?.winetricks?.verbs,
      options?.winetricks?.options
    );
    const { currentWorkflow, output, run } = buildPipeline({
      name: 'Create wine app - Workflow',
      jobs: [
        {
          name: 'Create wine app - Job',
          steps: [
            {
              name: 'Creating wine app folder',
              bashScript: 'createWineAppFolder',
            },
            {
              name: 'Extracting wine engine',
              bashScript: 'extractWineEngine',
            },
            {
              name: 'Generating wine prefix',
              bashScript: 'generateWinePrefix',
            },
            ...winetricksSteps,
            {
              name: 'Running setup executable',
              bashScript: 'runProgram',
              options: {
                env: {
                  EXE_PATH: options.setupExecutablePath,
                  EXE_FLAGS: options.exeFlags,
                },
              },
            },
            {
              name: 'Bundling app',
              bashScript: 'bundleApp',
            },
          ],
        },
      ],
    });

    const runningProcess = run();
    return { currentWorkflow, output, runningProcess };
  };

  /**
   * Opens winecfg ui.
   */
  const winecfg = async () => {
    runBashScript('winecfg');
  };

  /**
   * Transforms winetricks options into flags.
   */
  const winetricksOptionsToFlags = (options?: WinetricksOptions) => {
    options = { unattended: true, force: true, ...options };
    let flags = '';
    if (options?.unattended) flags += 'unattended ';
    if (options?.force) flags += 'force ';

    return `"${flags}"`;
  };

  /**
   * Generates winetricks steps for pipeline.
   */
  const generateWinetricksSteps = (
    tricks: string[] = [],
    options?: WinetricksOptions
  ) => {
    const flags = winetricksOptionsToFlags(options);
    const steps: JobStep[] = [];

    for (let trick of tricks) {
      steps.push({
        name: `Running winetrick ${trick}`,
        bashScript: 'winetrick',
        options: {
          ...options,
          env: {
            WINE_TRICK: trick,
            WINE_TRICK_FLAGS: flags,
          },
        },
      });
    }

    return steps;
  };

  /**
   * Runs winetricks
   */
  const winetricks = async (tricks: string[], options?: WinetricksOptions) => {
    const flags = winetricksOptionsToFlags(options);

    for (let trick of tricks) {
      await runBashScript('winetrick', {
        ...options,
        force: true,
        env: { WINE_TRICK: trick, WINE_TRICK_FLAGS: flags },
      });
    }
  };

  /**
   * Executes a program through wine.
   */
  const runProgram = async (
    executablePath: string,
    exeFlags: string[] = []
  ) => {
    exeFlags = exeFlags?.map?.((item) => `"${item}"`);
    await runBashScript('runProgram', {
      env: {
        EXE_PATH: executablePath,
        exeFlags,
      },
    });
  };

  return {
    createWineApp,
    winecfg,
    winetricks,
    runProgram,
  };
};
