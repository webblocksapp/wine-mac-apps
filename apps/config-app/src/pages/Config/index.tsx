import { Component } from 'solid-js';
import { Button, Grid } from 'www-shared';
import { Executables } from './Executables';
import { WineTools } from './WineTools';
import { Utilities } from './Utilities';
import { WrapperTools } from './WrapperTools';
import { useShellRunner } from 'desktop-shared';

export const Config: Component = () => {
  const shell = useShellRunner();

  const run = async () => {
    const x = await shell.executeBashScript('wineAppContentsPath', {
      args: 'dev',
    });
    console.log(x.stdout, x.stderr);
  };

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Button onClick={run}>Test</Button>
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
