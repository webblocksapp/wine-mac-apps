import { useShellRunner } from '@utils';
import {
  JobStep,
  WineApp,
  WineAppExecutable,
  WinetricksOptions,
} from '@interfaces';
import { useAppModel } from '@models';
import { Select, SelectProps, useDialogContext } from '@components';
import { withOwner } from '@hocs';
import { createSignal } from 'solid-js';
import { readTextFile } from '@tauri-apps/api/fs';

export const useWineApp = () => {
  const appModel = useAppModel();
  const appEnv = appModel.selectEnv();

  const { buildPipeline, spawnBashScript, executeBashScript, mergeEnv } =
    useShellRunner();

  /**
   * Initializes the env paths.
   */
  const buildAppEnv = (config: WineApp) => {
    const HOME = appEnv().HOME;
    const WINE_APP_NAME = config.name;
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
   * Creates a copy of the wine version from the engine
   * for the app to work standalone.
   */
  const create = (config: WineApp) => {
    //Initializes app env variables
    buildAppEnv(config);

    const winetricksSteps = generateWinetricksSteps(
      config?.winetricks?.verbs,
      config?.winetricks?.options
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
              fn: () => createWineAppFolder(config),
            },
            {
              name: 'Extracting wine engine',
              bashScript: 'extractWineEngine',
            },
            {
              name: 'Generating wine prefix',
              bashScript: 'generateWinePrefix',
            },
            ...(config?.dxvkEnabled ? [dxvkStep] : []),
            ...winetricksSteps,
            {
              name: 'Running setup executable',
              bashScript: 'runProgram',
              options: {
                env: {
                  EXE_PATH: config.setupExecutablePath,
                },
              },
            },
            {
              name: 'Bundling app',
              fn: () => bundleApp(config),
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
  const createWineAppFolder = async (config: WineApp) => {
    const { stdout } = await executeBashScript('buildAppPath');
    const appName = stdout.split('/').pop();
    appName &&
      appName !== config.name &&
      buildAppEnv({ ...config, name: appName });
    return spawnBashScript('createWineAppFolder');
  };

  /**
   * Bundles the app with main executable
   */
  const bundleApp = async (config: WineApp) => {
    const infoPlist = await buildInfoPlist();
    const executable = await selectExecutable();
    const { cmd, child } = await spawnBashScript('bundleApp');
    const { addExecutable, getConfigAsString } = configFileHandler(config);
    addExecutable(executable);
    child.write(`${infoPlist}\n`);
    child.write(`${getConfigAsString()}\n`);
    child.write(`${executable.path}\n`);
    return { cmd, child };
  };

  /**
   * Builds info plist file
   */
  const buildInfoPlist = async (
    args: {
      CFBundleExecutable?: string;
      CFBundleIconFile?: string;
    } = {}
  ) => {
    args = {
      CFBundleExecutable: 'winemacapp',
      CFBundleIconFile: 'winemacapp.ics',
      ...args,
    };

    let infoPlist = await readTextFile(
      `${appEnv().STUBS_PATH}/info.plist.stub`
    );

    for (let [key, value] of Object.entries(args)) {
      infoPlist = infoPlist.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return infoPlist.replace(/\n/g, '');
  };

  /**
   * Builds final application config file
   */
  const configFileHandler = (config: WineApp) => {
    config = JSON.parse(JSON.stringify(config));

    const addExecutable = (executable: WineAppExecutable) => {
      config.executables.push(executable);
    };

    const getConfigAsString = () => JSON.stringify(config);

    return {
      addExecutable,
      getConfigAsString,
    };
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

    return await new Promise<WineAppExecutable>((resolve) => {
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
            resolve({ path: executablePath(), main: true, flags: '' });
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
    create,
    winecfg,
    winetricks,
    runProgram,
  };
};
