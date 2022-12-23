import { Component } from 'solid-js';
import { Grid } from '@shared';

export const WrapperTools: Component = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>Refresh wrapper</Grid>
      <Grid item>Rebuild wrapper</Grid>
      <Grid item>Update wrapper</Grid>
      <Grid item>Change Engine used</Grid>
    </Grid>
  );
};
