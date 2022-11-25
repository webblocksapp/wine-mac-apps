import { ChildProcess } from '@tauri-apps/api/shell';
import { createSignal } from 'solid-js';
import { runScript as tauriRunScript, strReplacer } from '@utils';
import { Env, Pipeline, ProcessStatus } from '@interfaces';
import { createStore } from 'solid-js/store';

export const useShellRunner = (config?: { env?: Env }) => {
  const [childProcess, setChildProcess] = createSignal<ChildProcess>();
  const [consoleOutput, setConsoleOutput] = createSignal<string | undefined>(
    ''
  );
  const [pipeline, setPipeline] = createStore<Pipeline>({
    name: '',
    jobs: [],
    status: 'pending',
  });

  /**
   * Splits an script into separate commands.
   */
  const buildCommands = (script: string) => {
    script = strReplacer(script, { ...config?.env });
    let commands = script.split('&&');
    commands = addCodeStatusExecution(commands);
    return commands;
  };

  /**
   * Adds an script for echoing code status.
   * - 0 success.
   * - 1 error.
   */
  const addCodeStatusExecution = (commands: string[]) => {
    const parsedCommands: string[] = [];
    commands.forEach((cmd) => {
      parsedCommands.push(`${cmd}; echo "STATUS_COMMAND_CODE:"$?;`);
    });
    return parsedCommands;
  };

  /**
   * Executes a pipeline workflow.
   */
  const runPipeline = async (workflow: Pipeline) => {
    let abort = false;
    setPipeline(workflow);
    setConsoleOutput('');

    try {
      for (let i = 0; i < workflow.jobs.length; i++) {
        const job = workflow.jobs[i];
        const steps = job.steps;
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

      setPipeline('status', abort ? 'cancelled' : 'success');
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        print(`${errorMessage}\nAn unknown error ocurred, process terminated.`);
      }
    }
  };

  /**
   * Sets the pipeline step status.
   */
  const setStepStatus = (
    jobIndex: number,
    stepIndex: number,
    status: ProcessStatus
  ) => {
    setPipeline('jobs', jobIndex, 'steps', stepIndex, 'status', status);
  };

  /**
   * It runs the script and also handles the console output
   * during its execution.
   */
  const runScript = async (
    script: string,
    options?: { force?: boolean; onlyEcho?: boolean }
  ) => {
    const commands = buildCommands(script);
    const result: { status: ProcessStatus } = { status: 'success' };
    let abort = false;

    for (let command of commands) {
      await runCommand(`echo ${command}`);

      if (abort) {
        result.status = 'error';
        continue;
      }

      if (options?.onlyEcho !== true) await runCommand(command);
      if (options?.force !== true) abort = abortProcessOnError();
    }

    return result;
  };

  const runCommand = async (command: string) => {
    setChildProcess(await tauriRunScript(command));
    print(outputText());
  };

  /**
   * Abort a process when status code 1 (error).
   */
  const abortProcessOnError = () => {
    if (outputText().match(/(STATUS_COMMAND_CODE):(1)/g)?.length) {
      return true;
    }

    return false;
  };

  /**
   * Prints text at console output.
   */
  const print = (text: string) => {
    setConsoleOutput((prev) => `${prev}${text}`);
  };

  /**
   * Gets the complete output text from the child process.
   * (stdout and stderr)
   */
  const outputText = () => {
    return `${stdout()}${stderr()}`;
  };

  /**
   * Formats output text of unnecessary visible data.
   */
  const parseOutputText = (text: string = '') => {
    return text.replace?.(/(STATUS_COMMAND_CODE):(\d)/g, '') || '';
  };

  /**
   * Returns stout console output.
   */
  const stdout = () => {
    return childProcess()?.stdout || '';
  };

  /**
   * Returns stderr console output.
   */
  const stderr = () => {
    return childProcess()?.stderr || '';
  };

  return {
    runPipeline,
    consoleOutput: () => parseOutputText(consoleOutput()),
    pipeline,
    runScript,
    stdout,
    stderr,
  };
};
