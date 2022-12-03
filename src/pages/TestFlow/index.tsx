import { Component, For } from 'solid-js';
import { Button, Grid, PipelineViewer, useDialogContext } from '@components';
import { useShellRunner } from '@utils';
import {
  BashScript,
  CommandOptions,
  ScriptOptions,
  Workflow,
} from '@interfaces';

export const TestFlow: Component = () => {
  const shell = useShellRunner();
  const { createDialog } = useDialogContext();

  const runBashScript = async (script: BashScript, options?: ScriptOptions) => {
    const { runBashScript } = shell;
    const { cmd } = await runBashScript(script, options);
    cmd.stdout.on('data', (data) => console.log(data));
    cmd.stderr.on('data', (data) => console.log(data));
    cmd.on('close', (data) => console.log(data));
  };

  const executeScript = async (script: string, options?: CommandOptions) => {
    const { executeScript } = shell;
    const { stdout, stderr } = await executeScript(script, options);
    console.log('stdout', stdout);
    console.log('stderr', stderr);
  };

  const buildPipeline = async (workflow: Workflow) => {
    const { buildPipeline } = shell;
    const pipeline = buildPipeline(workflow);
    createDialog({
      content: () => <PipelineViewer workflow={pipeline.currentWorkflow} />,
    });
    await pipeline.run();
    console.log(pipeline.output());
  };

  const callback = async () => {
    const { runBashScript } = shell;
    const { cmd, child } = await runBashScript('tests/pipe');

    cmd.stdout.on('data', async (data) => {
      console.log(data);
    });
    cmd.stderr.on('data', (data) => console.log(data));
    cmd.on('error', (data) => console.log(data));
    cmd.on('close', (data) => console.log('Closed', data));
    await child.write('A\n');
    await child.write('B\n');
  };

  const buttons = [
    {
      name: 'tests/printHelloWorld',
      script: 'printHelloWorld',
      fn: runBashScript,
    },
    {
      name: 'tests/scriptWithError',
      script: 'scriptWithError',
      fn: runBashScript,
    },
    {
      name: 'winetricks apps list',
      script: 'winetricks apps list',
      fn: executeScript,
    },
    {
      name: 'Sum A + B',
      script: 'Sum A + B',
      fn: () =>
        executeScript('sum=$(($A + $B)); echo $sum;', {
          env: { A: 22, B: 33 },
        }),
    },
    {
      name: 'Sum C + D',
      script: 'Sum C + D',
      fn: () => executeScript('C=12 D=12 sum=$(($C + $D)); echo $sum;'),
    },
    {
      name: 'Pipeline 1',
      workflow: {
        name: 'Pipeline 1',
        jobs: [
          {
            name: 'Test Job',
            steps: [
              {
                name: 'Echo hello world',
                script: 'echo "Hello world"',
                bashScript: 'tests/printHelloWorld',
              },
              {
                name: 'Echo sum',
                script: 'C=12 D=12 sum=$(($C + $D)); echo $sum;',
              },
            ],
          },
        ],
      },
      fn: buildPipeline,
    },
    {
      name: 'Pipeline 2',
      workflow: {
        name: 'Pipeline 1',
        jobs: [
          {
            name: 'Test Job',
            steps: [
              {
                name: 'Script with error',
                bashScript: 'tests/scriptWithError',
              },
              {
                name: 'Echo sum',
                script: 'C=12 D=12 sum=$(($C + $D)); echo $sum;',
              },
            ],
          },
        ],
      },
      fn: buildPipeline,
    },
    {
      name: 'winetrick',
      script: 'winetrick',
      fn: () => {
        runBashScript('winetrick', {
          env: {
            WINE_APP_BIN_PATH: '--force',
          },
        });
      },
    },
    {
      name: 'Beep Dialog',
      script: 'tests/beepDialog',
      fn: runBashScript,
    },
  ];

  return (
    <Grid container spacing={4}>
      <For each={buttons}>
        {(button) => (
          <Grid item>
            <Button
              onClick={() => {
                button.script && button.fn(button.script as any);
                button.workflow && button.fn(button.workflow as any);
              }}
            >
              {button.name}
            </Button>
          </Grid>
        )}
      </For>
      <Grid item>
        <Button onClick={callback}>Callback</Button>
      </Grid>
    </Grid>
  );
};
