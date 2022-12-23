import { Component } from 'solid-js';
import { Grid } from '@shared';

export const Utilities: Component = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>winetricks</Grid>
      <Grid item>custom exe creator</Grid>
      <Grid item>view last run log file</Grid>
      <Grid item>winehq engine launch</Grid>
      <Grid item>kill wine procesess</Grid>
    </Grid>
  );
};
