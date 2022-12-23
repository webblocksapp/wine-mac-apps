import { Component } from 'solid-js';
import { Grid } from '@shared';

export const WineTools: Component = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>winecfg</Grid>
      <Grid item>regedit</Grid>
      <Grid item>taskmanager</Grid>
      <Grid item>cmd</Grid>
      <Grid item>uninstaller</Grid>
    </Grid>
  );
};
