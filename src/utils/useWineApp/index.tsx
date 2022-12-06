import { useShellRunner } from '@utils';
import { JobStep, WineAppConfig, WinetricksOptions } from '@interfaces';
import { useAppModel } from '@models';
import { Select, SelectProps, useDialogContext } from '@components';
import { withOwner } from '@hocs';
import { createSignal } from 'solid-js';

export const useWineApp = (config: WineAppConfig) => {
  const appModel = useAppModel();
  const appEnv = appModel.selectEnv();

  const { buildPipeline, spawnBashScript, executeBashScript, mergeEnv } =
    useShellRunner();

  /**
   * Initializes the env paths.
   */
  const buildAppEnv = (appName: string) => {
    const HOME = appEnv().HOME;
    const WINE_APP_NAME = appName;
    const WINE_BASE_PATH = `${HOME}/Wine`;
    const WINE_LIBS_PATH = `${WINE_BASE_PATH}/libs`;
    const WINE_ENGINES_PATH = `${WINE_BASE_PATH}/engines`;
    const WINE_APPS_PATH = `${WINE_BASE_PATH}/apps`;
    const WINE_APP_PATH = `${WINE_APPS_PATH}/${WINE_APP_NAME}`;
    const WINE_APP_CONTENTS_PATH = `${WINE_APP_PATH}/Contents`;
    const WINE_APP_SHARED_SUPPORT_PATH = `${WINE_APP_CONTENTS_PATH}/SharedSupport`;
    const WINE_APP_LOGS_PATH = `${WINE_APP_SHARED_SUPPORT_PATH}/Logs`;
    const WINE_APP_ENGINE_PATH = `${WINE_APP_SHARED_SUPPORT_PATH}/wine`;
    const WINE_APP_PREFIX_PATH = `${WINE_APP_SHARED_SUPPORT_PATH}/prefix`;
    const WINE_APP_DRIVE_C_PATH = `${WINE_APP_PREFIX_PATH}/drive_c`;
    const WINE_APP_BIN_PATH = `${WINE_APP_ENGINE_PATH}/bin`;
    const WINE_ENGINE_VERSION = config.engine.version;

    mergeEnv({
      HOME,
      WINE_APP_NAME,
      WINE_BASE_PATH,
      WINE_LIBS_PATH,
      WINE_ENGINES_PATH,
      WINE_APPS_PATH,
      WINE_APP_PATH,
      WINE_APP_SHARED_SUPPORT_PATH,
      WINE_APP_LOGS_PATH,
      WINE_APP_ENGINE_PATH,
      WINE_APP_PREFIX_PATH,
      WINE_APP_DRIVE_C_PATH,
      WINE_APP_BIN_PATH,
      WINE_ENGINE_VERSION,
    });
  };

  /**
   * Initializes app env variables
   */
  buildAppEnv(config.name);

  /**
   * Creates a copy of the wine version from the engine
   * for the app to work standalone.
   */
  const createWineApp = (options: {
    setupExecutablePath: string;
    exeFlags?: string;
    winetricks?: { verbs?: string[]; options?: WinetricksOptions };
    dxvkEnabled?: boolean;
  }) => {
    const winetricksSteps = generateWinetricksSteps(
      options?.winetricks?.verbs,
      options?.winetricks?.options
    );

    const dxvkStep: JobStep = {
      name: 'Configuring DXVK',
      bashScript: 'enableDxvk',
      options: { force: true }, //Skips warning ./dxvk_macos.verb: No such file or directory,
    };

    const { currentWorkflow, output, run } = buildPipeline({
      name: 'Create wine app - Workflow',
      jobs: [
        {
          name: 'Create wine app - Job',
          steps: [
            {
              name: 'Creating wine app folder',
              fn: createWineAppFolder,
            },
            {
              name: 'Extracting wine engine',
              bashScript: 'extractWineEngine',
            },
            {
              name: 'Generating wine prefix',
              bashScript: 'generateWinePrefix',
            },
            ...(options?.dxvkEnabled ? [dxvkStep] : []),
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
              fn: bundleApp,
            },
          ],
        },
      ],
    });

    const runningProcess = run();
    return { currentWorkflow, output, runningProcess };
  };

  /**
   * Logic for creating the wine application folder.
   */
  const createWineAppFolder = async () => {
    const { stdout } = await executeBashScript('buildAppPath');
    const appName = stdout.split('/').pop();
    appName && appName !== config.name && buildAppEnv(appName);
    return spawnBashScript('createWineAppFolder');
  };

  /**
   * Bundles the app with main executable
   */
  const bundleApp = async () => {
    const executable = await selectExecutable();
    const { cmd, child } = await spawnBashScript('bundleApp');
    child.write(`${executable}\n`);
    return { cmd, child };
  };

  /**
   * Application executable selector.
   */
  const selectExecutable = withOwner(async () => {
    const { createDialog, configDialog } = useDialogContext();
    const { stdout } = await executeBashScript('listAppExecutables');
    const executables =
      stdout.split('\n').map((item) => ({
        value: item.split('SharedSupport/prefix').pop() || '',
        label: item.split('/').pop() || '',
      })) || [];

    return await new Promise<string>((resolve) => {
      createDialog({
        content: ({ dialogId }) => {
          const [executablePath, setExecutablePath] = createSignal('');

          const onInput: SelectProps['onInput'] = (event) => {
            setExecutablePath(event.value);
            configDialog(dialogId, {
              acceptDisabled: !Boolean(executablePath()),
            });
          };

          const onClose = () => {
            resolve(executablePath());
          };

          configDialog(dialogId, { onClose });

          return (
            <>
              <Select
                label="Executable"
                placeholder="Select an executable"
                options={executables}
                onInput={onInput}
                value={executablePath()}
              />
            </>
          );
        },
        acceptText: 'Select',
      });
    });
  });

  /**
   * Opens winecfg ui.
   */
  const winecfg = async () => {
    spawnBashScript('winecfg');
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
      await spawnBashScript('winetrick', {
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
    await spawnBashScript('runProgram', {
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
