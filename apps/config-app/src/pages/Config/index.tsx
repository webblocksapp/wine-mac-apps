import { Component, createSignal } from 'solid-js';
import { Button, Grid } from 'www-shared';
import { Executables } from './Executables';
import { WineTools } from './WineTools';
import { Utilities } from './Utilities';
import { WrapperTools } from './WrapperTools';
import { useShellRunner } from 'desktop-shared';

export const Config: Component = () => {
  const shell = useShellRunner();
  const [disabled, setDisabled] = createSignal(false);

  const run = async () => {
    setDisabled(true);
    const { cmd } = await shell.spawnBashScript('winecfg');
    cmd.on('close', () => setDisabled(false));
    cmd.stdout.on('data', (data) => console.log(data));
    cmd.stderr.on('data', (data) => console.error(data));
  };

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Button onClick={run} disabled={disabled()}>
          Test
        </Button>
        <Executables />
      </Grid>
      <Grid item>
        <WineTools />
      </Grid>
      <Grid item>
        <Utilities />
      </Grid>
      <Grid item>
        <WrapperTools />
      </Grid>
    </Grid>
  );
};
