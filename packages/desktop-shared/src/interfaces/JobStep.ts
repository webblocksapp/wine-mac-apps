import { BashScript, ScriptOptions, Cmd } from '@interfaces';
import { ProcessStatus } from 'www-shared';
import { Child } from '@tauri-apps/api/shell';

export type JobStep = {
  name: string;
  script?: string;
  bashScript?: BashScript;
  fn?: (...args: any[]) => Promise<{
    cmd: Cmd;
    child: Child;
  }>;
  options?: ScriptOptions;
  status?: ProcessStatus;
  output?: string;
};
