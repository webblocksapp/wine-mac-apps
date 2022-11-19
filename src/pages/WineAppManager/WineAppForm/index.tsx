import { Component } from 'solid-js';
import { Grid, Typography, TextInput, Select } from '@components';
import { useFormHandler } from '@utils';
import { schema } from './schema';

export const WineAppForm: Component = () => {
  const formHandler = useFormHandler(schema);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography component="h4">Create Wine App</Typography>
      </Grid>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput
                label="Application Name"
                name="name"
                formHandler={formHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Wine Engine"
                name="engine"
                placeholder="Select an engine"
                options={[
                  {
                    value: 'WS11WineCX64Bit22.0.1',
                    label: 'WS11WineCX64Bit22.0.1',
                  },
                ]}
                formHandler={formHandler}
              />
            </Grid>
            <Grid item xs={12}>
              {JSON.stringify(formHandler.formData(), null, 2)}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
