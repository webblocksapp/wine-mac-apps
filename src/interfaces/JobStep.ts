import { ProcessStatus, ScriptOptions } from '@interfaces';

export type JobStep = {
  name: string;
  script: string;
  options?: ScriptOptions;
  status?: ProcessStatus;
  output?: string;
};
