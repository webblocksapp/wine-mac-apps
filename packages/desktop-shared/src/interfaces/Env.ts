import { CommonObject } from 'www-shared';

export type Env = Partial<{
  HOME: string;
  SCRIPTS_PATH: string;
  WINE_ENGINE_VERSION: string;
}> &
  CommonObject;
