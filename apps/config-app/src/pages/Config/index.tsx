import { Component } from 'solid-js';
import { Grid } from 'www-shared';
import { Executables } from './Executables';
import { WineTools } from './WineTools';
import { Utilities } from './Utilities';
import { WrapperTools } from './WrapperTools';

export const Config: Component = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>
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
