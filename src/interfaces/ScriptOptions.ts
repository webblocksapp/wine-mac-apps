import { Env } from '@interfaces';

export type ScriptOptions = {
  force?: boolean;
  env?: Env;
  echo?: boolean;
  showStatusCode?: boolean;
};
