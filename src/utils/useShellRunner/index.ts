import { ChildProcess } from '@tauri-apps/api/shell';
import { createEffect, createSignal } from 'solid-js';
import { runScript as tauriRunScript, strReplacer } from '@utils';
import {
  Pipeline,
  ProcessStatus,
  WineAppConfig,
  WineAppEnv,
} from '@interfaces';
import { createStore } from 'solid-js/store';

export const useShellRunner = (
  config: WineAppConfig & { appEnv: WineAppEnv }
) => {
  const [childProcess, setChildProcess] = createSignal<ChildProcess>();
  const [consoleOutput, setConsoleOutput] = createSignal<string | undefined>(
    ''
  );
  const [pipeline, setPipeline] = createStore<Pipeline>({
    name: '',
    jobs: [],
  });

  const buildCommands = (script: string) => {
    script = strReplacer(script, { ...config.appEnv });
    const commands = addCodeStatusExecution(script.split('&&'));
    return commands;
  };

  const addCodeStatusExecution = (commands: string[]) => {
    const parsedCommands: string[] = [];
    commands.forEach((cmd) => {
      parsedCommands.push(`${cmd}; echo "STATUS_COMMAND_CODE:"$?;`);
    });
    return parsedCommands;
  };

  const runPipeline = async (workflow: Pipeline) => {
    let abort = false;
    setPipeline(workflow);

    try {
      for (const jobs of workflow.jobs) {
        for (let i = 0; i < jobs.steps.length; i++) {
          const steps = jobs.steps;
          for (let j = 0; j < steps.length; j++) {
            if (abort) {
              setStepStatus(i, j, 'cancelled');
              continue;
            } else {
              setStepStatus(i, j, 'inProgress');
              const step = steps[j];
              const { status } = await runScript(step.script);
              if (status === 'error') abort = true;
              setStepStatus(i, j, status);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        print(`${errorMessage}\nAn unknown error ocurred, process terminated.`);
      }
    }
  };

  const setStepStatus = (
    jobIndex: number,
    stepIndex: number,
    status: ProcessStatus
  ) => {
    setPipeline('jobs', jobIndex, 'steps', stepIndex, 'status', status);
  };

  const runScript = async (script: string) => {
    const commands = buildCommands(script);
    const result: { status: ProcessStatus } = { status: 'finished' };
    let abort = false;
    for (let command of commands) {
      setChildProcess(await tauriRunScript(`echo ${command}`));

      if (abort) {
        result.status = 'error';
        continue;
      }

      setChildProcess(await tauriRunScript(command));
      abort = abortProcessOnError();
    }

    return result;
  };

  const abortProcessOnError = () => {
    if (outputText().match(/(STATUS_COMMAND_CODE):(1)/g)?.length) {
      return true;
    }

    return false;
  };

  const print = (text: string) => {
    setConsoleOutput((prev) => `${prev}${text}`);
  };

  const outputText = () => {
    return `${childProcess()?.stdout || ''}${childProcess()?.stderr || ''}`;
  };

  const parseOutputText = (text: string) => {
    return text.replace?.(/(STATUS_COMMAND_CODE):(\d)/g, '') || '';
  };

  createEffect(() => {
    setConsoleOutput((prev) => `${prev}${parseOutputText(outputText())}`);
  });

  return { runPipeline, consoleOutput, pipeline, runScript };
};
