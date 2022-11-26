import { ChildProcess } from '@tauri-apps/api/shell';
import { createSignal, observable } from 'solid-js';
import { runScript as tauriRunScript, strReplacer } from '@utils';
import {
  Env,
  Pipeline,
  ProcessStatus,
  ScriptOptions,
  Subscription,
} from '@interfaces';
import { createStore } from 'solid-js/store';

export const useShellRunner = (config?: { env?: Env }) => {
  const env = { ...config?.env };
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
   * Adds envs to be replaced
   */
  const mergeEnv = (newEnv?: Env) => {
    Object.assign(env, newEnv);
  };

  /**
   * Splits an script into separate commands.
   */
  const buildCommands = (
    script: string,
    options?: { showStatusCode?: boolean; echo?: boolean }
  ) => {
    script = strReplacer(script, env);
    let commands = script.split(/;/g);
    commands = commands.map((command) =>
      command.replace(/^\s+/, '').replace(/$\s+/, '')
    );

    const parsedCommands: string[] = [];

    for (let cmd of commands) {
      if (!cmd) continue;
      if (options?.echo) parsedCommands.push(`echo ${cmd};`);
      parsedCommands.push(`${cmd};`);
      if (options?.showStatusCode)
        parsedCommands.push(`echo "STATUS_COMMAND_CODE:"$?;`);
    }

    return parsedCommands;
  };

  /**
   * Executes a pipeline workflow.
   */
  const runPipeline = async (workflow: Pipeline) => {
    let abort = false;
    setPipeline(workflow);
    setConsoleOutput('');
    const output$ = observable(outputText);
    let outputSubscription: Subscription | undefined;

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
            outputSubscription = output$.subscribe((output) => {
              setStepOutput(i, j, parseOutputText(output));
            });
            const { status } = await runScript(step.script, {
              showStatusCode: true,
              ...step.options,
            });
            outputSubscription.unsubscribe();
            if (status === 'error') abort = true;
            setStepStatus(i, j, status);
          }
        }
      }

      setPipeline('status', abort ? 'cancelled' : 'success');
    } catch (error) {
      console.error(error);
    } finally {
      outputSubscription?.unsubscribe?.();
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
   * Sets the pipeline step output.
   */
  const setStepOutput = (
    jobIndex: number,
    stepIndex: number,
    output: string
  ) => {
    setPipeline(
      'jobs',
      jobIndex,
      'steps',
      stepIndex,
      'output',
      (prev) => `${prev || ''}\n${output}`
    );
  };

  /**
   * It runs the script and also handles the console output
   * during its execution.
   */
  const runScript = async (script: string, options?: ScriptOptions) => {
    mergeEnv(options?.env);
    const commands = buildCommands(script, options);
    const result: { status: ProcessStatus } = { status: 'success' };
    let abort = false;

    for (let command of commands) {
      if (abort) {
        result.status = 'error';
        continue;
      }

      await runCommand(command);

      if (options?.force !== true) abort = abortProcessOnError();
      if (abort) result.status = 'error';
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
