import { Id, Pipeline } from '@interfaces';
import {
  Accordion,
  Box,
  Card,
  Code,
  Grid,
  ProcessStatusIcon,
  Typography,
} from '@components';
import { Component, For } from 'solid-js';
import { capitalize } from '@utils';

export interface PipelineViewerProps {
  id?: Id;
  pipeline: Pipeline;
}

export const PipelineViewer: Component<PipelineViewerProps> = (props) => {
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
                        <Code>Hello world!</Code>
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
