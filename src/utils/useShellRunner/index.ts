import {
  Child,
  ChildProcess,
  Command,
  EventEmitter,
} from '@tauri-apps/api/shell';
import { createSignal, observable } from 'solid-js';
import { strReplacer } from '@utils';
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
  const [currentOutput, setCurrentOutput] = createSignal<string>('');
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
      parsedCommands.push(
        `${cmd}; ${
          options?.showStatusCode ? `echo "STATUS_COMMAND_CODE:"$?;` : ''
        }`
      );
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
    const output$ = observable(currentOutput);
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
              setStepOutput(i, j, parseOutput(output));
            });
            const { status } = await spawnScript(step.script, {
              ...step.options,
              showStatusCode: true, //Not overridable
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
    status?: ProcessStatus
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
   * It runs the script and outputs the console in realtime.
   */
  const spawnScript = (
    script: string,
    options?: ScriptOptions
  ): Promise<{
    child: Child;
    stdout: EventEmitter<'data'>;
    stderr: EventEmitter<'data'>;
    status?: ProcessStatus;
  }> => {
    return handleScript('spawn', script, options);
  };

  /**
   * It runs the script and outputs the console after it's executed.
   */
  const runScript = (
    script: string,
    options?: ScriptOptions
  ): Promise<{
    stdout: string;
    stderr: string;
    childProcess: ChildProcess;
    status?: ProcessStatus;
  }> => {
    return handleScript('exec', script, options);
  };

  /**
   * Handles the script according to the given action.
   */
  const handleScript = async (
    action: 'spawn' | 'exec',
    script: string,
    options?: ScriptOptions
  ) => {
    setCurrentOutput('');
    mergeEnv(options?.env);

    const commands = buildCommands(script, options);
    let result: any = { status: 'success' };
    let abort = false;

    for (let command of commands) {
      if (abort) {
        result.status = 'error';
        continue;
      }

      if (action === 'spawn')
        result = { ...result, ...(await spawnCommand(command)) };
      if (action === 'exec')
        result = { ...result, ...(await execCommand(command)) };

      if (options?.force !== true) abort = abortProcessOnError();
      if (abort) result.status = 'error';
    }

    return result;
  };

  /**
   * Executes a command with tauri printing the output in realtime.
   */
  const spawnCommand = async (command: string) => {
    const cmd = new Command('run-script', ['-c', command]);
    cmd.on('error', (error) => print(error));
    cmd.stdout.on('data', (data) => print(data));
    cmd.stderr.on('data', (data) => print(data));

    return new Promise<{
      child: Child;
      stdout: EventEmitter<'data'>;
      stderr: EventEmitter<'data'>;
    }>(async (resolve) => {
      const child = await cmd.spawn();
      cmd.on('close', () => {
        resolve({ child, stdout: cmd.stdout, stderr: cmd.stderr });
      });
    });
  };

  /**
   * Executes a command with tauri printing the output after its execution.
   */
  const execCommand = async (command: string) => {
    const cmd = new Command('run-script', ['-c', command]);
    const childProcess = await cmd.execute();
    return {
      stdout: childProcess.stdout,
      stderr: childProcess.stderr,
      childProcess,
    };
  };

  /**
   * Abort a process when status code 1 (error).
   */
  const abortProcessOnError = () => {
    if (currentOutput().match(/(STATUS_COMMAND_CODE):(1)/g)?.length) {
      return true;
    }

    return false;
  };

  /**
   * Prints text at console output.
   */
  const print = (text: string) => {
    setCurrentOutput(text);
    setConsoleOutput((prev) => `${prev}${text}`);
  };

  /**
   * Formats output text of unnecessary visible data.
   */
  const parseOutput = (text: string = '') => {
    return text.replace?.(/(STATUS_COMMAND_CODE):(\d)/g, '') || '';
  };

  return {
    runPipeline,
    consoleOutput: () => parseOutput(consoleOutput()),
    pipeline,
    spawnScript,
    runScript,
  };
};
