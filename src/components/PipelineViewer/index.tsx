import { Id, Pipeline } from '@interfaces';
import {
  Accordion,
  Box,
  Card,
  Code,
  Grid,
  ProcessStatusIcon,
  Typography,
  useDialogContext,
} from '@components';
import { Component, createEffect, For } from 'solid-js';
import { capitalize } from '@utils';

export interface PipelineViewerProps {
  id?: Id;
  pipeline: Pipeline;
}

export const PipelineViewer: Component<PipelineViewerProps> = (props) => {
  const { configDialog } = useDialogContext();

  createEffect(() => {
    if (
      props.pipeline.status === 'success' ||
      props.pipeline.status === 'error' ||
      props.pipeline.status === 'cancelled'
    ) {
      configDialog(props.id, { acceptDisabled: false });
    } else {
      configDialog(props.id, { acceptDisabled: true });
    }
  });

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography component="h4">
          {capitalize(props.pipeline.name)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <For each={props.pipeline.jobs}>
          {(job) => (
            <Card>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography component="h6">{capitalize(job.name)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <For each={job.steps}>
                    {(step, index) => (
                      <Accordion
                        text={
                          <Box display="grid" gridTemplateColumns="110px 1fr">
                            <Box display="flex" alignItems="center">
                              <Box mr={2}>
                                <ProcessStatusIcon status={step.status} />
                              </Box>
                              <Typography>Step {index() + 1}:</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                              <Typography>{step.name}</Typography>
                            </Box>
                          </Box>
                        }
                      >
                        <Code>{step.output}</Code>
                      </Accordion>
                    )}
                  </For>
                </Grid>
              </Grid>
            </Card>
          )}
        </For>
      </Grid>
    </Grid>
  );
};
