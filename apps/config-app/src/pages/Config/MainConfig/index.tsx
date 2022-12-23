import { Component } from 'solid-js';
import { Grid } from '@shared';

export const MainConfig: Component = () => {
  return (
    <Grid container spacing={3}>
      <Grid item></Grid>
      <Grid item>Exe flags</Grid>
      <Grid item>Icon selector</Grid>
    </Grid>
  );
};
