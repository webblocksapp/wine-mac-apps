import { Component } from 'solid-js';
import { Grid, Typography, TextInput } from 'www-shared';
import { FilePathInput } from 'desktop-shared';

export const Executables: Component = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography component="h5">Executables Config</Typography>
      </Grid>
      <Grid item>
        <FilePathInput />
      </Grid>
      <Grid item>
        <TextInput label="Exe Flags" name="flags" />
      </Grid>
    </Grid>
  );
};
