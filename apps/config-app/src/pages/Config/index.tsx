import { Component } from 'solid-js';
import { Grid } from '@shared';
import { MainConfig } from './MainConfig';
import { WineTools } from './WineTools';
import { Utilities } from './Utilities';
import { WrapperTools } from './WrapperTools';

export const Config: Component = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <MainConfig />
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
