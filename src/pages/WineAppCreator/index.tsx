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
      createWineApp();
    } catch (error) {}
  };

  const createWineApp = () => {
    const { pipeline, ...rest } = useWineApp({
      appName: 'Steam',
      engine: {
        url: 'https://mega.nz/file/VF4mSCpQ#UDC10env2AKKAEqqfv2Gbz8sk26mkwn1VNcAOL_nIi4',
        version: 'WS11WineCX64Bit22.0.1',
        id: 1,
      },
    });

    rest.createWineApp();

    createDialog({
      content: ({ dialogId }) => (
        <PipelineViewer id={dialogId} pipeline={pipeline} />
      ),
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
              <WinetricksSelector name="winetricks" formHandler={formHandler} />
            </Grid>
            <Grid item xs={12}>
              <pre>
                <code>{JSON.stringify(formHandler.formData(), null, 2)}</code>
              </pre>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit">Create</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
