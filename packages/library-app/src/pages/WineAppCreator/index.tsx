import { Component, Show } from 'solid-js';
import {
  Grid,
  Typography,
  TextInput,
  useDialogContext,
  Button,
  Box,
  Checkbox,
  useFormHandler,
} from '@shared';
import {
  FilePathInput,
  WinetricksSelector,
  WineEngineSelector,
  PipelineViewer,
} from '@components';
import { useWineApp } from '@utils';
import { schema, Schema } from './schema';

export const WineAppCreator: Component = () => {
  const formHandler = useFormHandler<Schema>(schema);
  const wineApp = useWineApp();
  const { formData } = formHandler;
  const { createDialog } = useDialogContext();

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      await createWineApp();
    } catch (error) {
      console.error(error);
    }
  };

  const createWineApp = async () => {
    const { currentWorkflow } = wineApp.create(formData());

    createDialog({
      content: ({ dialogId }) => (
        <PipelineViewer id={dialogId} workflow={currentWorkflow} />
      ),
      hideClose: true,
      acceptText: 'Close',
      maxWidth: 'xxl',
    });
  };

  return (
    <Grid container spacing={4}>
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
            <Grid item xs={12} md={6}>
              <Checkbox
                label="Use Winetricks"
                name="useWinetricks"
                display="switch"
                formHandler={formHandler}
                triggers={['winetricks']}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Checkbox
                label="Enable DXVK"
                checked
                name="dxvkEnabled"
                display="switch"
                formHandler={formHandler}
              />
            </Grid>
            <Show when={formData().useWinetricks}>
              <Grid item xs={12}>
                <WinetricksSelector
                  name="winetricks.verbs"
                  formHandler={formHandler}
                />
              </Grid>
            </Show>
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
