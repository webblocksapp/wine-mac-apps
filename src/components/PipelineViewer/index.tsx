import { Pipeline } from '@interfaces';
import {
  Accordion,
  Box,
  Card,
  Code,
  Grid,
  Image,
  LoadingSpinner,
  Typography,
} from '@components';
import { Component, For, Match, Switch } from 'solid-js';
import { capitalize } from '@utils';
import PendingIcon from '@imgs/pending-icon.png';
import FailedIcon from '@imgs/failed-icon.png';
import SuccessIcon from '@imgs/success-icon.png';
import { ProcessStatusIcon } from '../ProcessStatusIcon';

export interface PipelineViewerProps {
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
