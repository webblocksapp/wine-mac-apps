import { Job } from '@interfaces';

export type Pipeline = {
  name: string;
  jobs: Job[];
};
