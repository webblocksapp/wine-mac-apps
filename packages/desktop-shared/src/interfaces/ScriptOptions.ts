import { BashScript, BashScriptArgs, Env } from '@interfaces';

export type ScriptOptions<T extends BashScript> = {
  force?: boolean;
  env?: Env;
  args?: BashScriptArgs[T];
};
