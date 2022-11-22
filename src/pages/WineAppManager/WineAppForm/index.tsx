import { Component } from 'solid-js';
import {
  Dialog,
  Grid,
  Typography,
  TextInput,
  FilePathInput,
  WinetricksSelector,
  WineEngineSelector,
  useDialogContext,
  Button,
} from '@components';
import { useFormHandler } from '@utils';
import { schema } from './schema';

export const WineAppForm: Component = () => {
  const formHandler = useFormHandler(schema);
  const { createDialog } = useDialogContext();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography component="h4">Create Wine App</Typography>
      </Grid>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextInput
                label="Application Name"
                name="name"
                formHandler={formHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <WineEngineSelector name="engine" formHandler={formHandler} />
            </Grid>
            <Grid item xs={12}>
              <FilePathInput
                label="Setup Executable Path"
                name="setupExecutablePath"
                formHandler={formHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <WinetricksSelector name="winetricks" formHandler={formHandler} />
            </Grid>
            <Grid item xs={12}>
              <pre>
                <code>{JSON.stringify(formHandler.formData(), null, 2)}</code>
              </pre>
            </Grid>
          </Grid>
        </form>
        <Button
          onClick={() => {
            createDialog();
          }}
        >
          Open Modal
        </Button>
      </Grid>
    </Grid>
  );
};
