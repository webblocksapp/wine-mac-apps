import { Job } from '@interfaces';
import { ProcessStatus } from 'www-shared';

export type Workflow = {
  name: string;
  jobs: Job[];
  status?: ProcessStatus;
};
