import { ProcessStatus } from '@interfaces';

export type JobStep = {
  name: string;
  script: string;
  status: ProcessStatus;
};
