import { Job, ProcessStatus } from '@interfaces';

export type Pipeline = {
  name: string;
  jobs: Job[];
  status?: ProcessStatus;
};
