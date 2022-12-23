import { Workflow } from '@interfaces';
import {
  Id,
  Accordion,
  capitalize,
  Box,
  Card,
  Code,
  Grid,
  ProcessStatusIcon,
  Typography,
  useDialogContext,
} from 'www-shared';
import { Component, createEffect, For } from 'solid-js';

export interface PipelineViewerProps {
  id?: Id;
  workflow: Workflow;
}

export const PipelineViewer: Component<PipelineViewerProps> = (props) => {
  const { configDialog } = useDialogContext();

  createEffect(() => {
    if (
      props.workflow.status === 'success' ||
      props.workflow.status === 'error' ||
      props.workflow.status === 'cancelled'
    ) {
      configDialog(props.id, { acceptDisabled: false });
    } else {
      configDialog(props.id, { acceptDisabled: true });
    }
  });

  return (
    <Grid class="pipeline-viewer" container spacing={4}>
      <Grid item xs={12}>
        <Typography component="h4">
          {capitalize(props.workflow.name)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <For each={props.workflow.jobs}>
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
                        disabled={!step?.output?.match(/\S/)}
                        expandable={Boolean(step.output)}
                        text={
                          <Box display="grid" gridTemplateColumns="110px 1fr">
                            <Box display="flex" alignItems="center">
                              <Box mr={2}>
                                <ProcessStatusIcon status={step.status} />
                              </Box>
                              <Typography>Step {index() + 1}:</Typography>
                            </Box>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
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
