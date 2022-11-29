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
import { useFormHandler, useWineApp } from '@utils';
import { WineApp } from '@interfaces';
import { schema } from './schema';

export const WineAppCreator: Component = () => {
  const formHandler = useFormHandler<WineApp>(schema);
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
    const { name, engine, setupExecutablePath, winetricksVerbs } = formData();
    const { createWineApp } = useWineApp({
      name,
      engine,
    });

    const { currentWorkflow } = createWineApp({
      setupExecutablePath,
      winetricks: { verbs: winetricksVerbs },
    });

    createDialog({
      content: ({ dialogId }) => (
        <PipelineViewer id={dialogId} workflow={currentWorkflow} />
      ),
      hideClose: true,
      acceptText: 'Close',
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
            <Grid item xs={12}>
              <WinetricksSelector
                name="winetricksVerbs"
                formHandler={formHandler}
              />
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
