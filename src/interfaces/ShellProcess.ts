import { ShellRunner } from '@interfaces';

export type ShellProcess =
  | Awaited<ReturnType<ShellRunner['runPipeline']>>
  | undefined;
