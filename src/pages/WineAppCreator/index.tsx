import { Component } from 'solid-js';
import {
  Grid,
  Typography,
  TextInput,
  FilePathInput,
  WinetricksSelector,
  WineEngineSelector,
  useDialogContext,
  Button,
  PipelineViewer,
  Box,
} from '@components';
import { useFormHandler } from '@utils';
import { schema } from './schema';
import { createWineAppPipeline } from '@shell';

export const WineAppCreator: Component = () => {
  const formHandler = useFormHandler(schema);
  const { createDialog } = useDialogContext();

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      createDialog({
        content: ({ dialogId }) => <>{JSON.stringify(dialogId)}</>,
      });
    } catch (error) {}
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PipelineViewer pipeline={createWineAppPipeline} />
      </Grid>
      <Grid item xs={12}>
        <Typography component="h4">Create Wine App</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={submit}>
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
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" disabled={formHandler.isFormInvalid()}>
                  Create
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
