import { BashScript, ProcessStatus, ScriptOptions } from '@interfaces';

export type JobStep = {
  name: string;
  script?: string;
  bashScript?: BashScript;
  options?: ScriptOptions;
  status?: ProcessStatus;
  output?: string;
};
