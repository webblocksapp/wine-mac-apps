import { CommonObject } from 'www-shared';

export type Env = Partial<{
  EXE_FLAGS: string;
  EXE_PATH: string;
  HOME: string;
  SCRIPTS_PATH: string;
  WINE_ENGINE_VERSION: string;
  WINE_TRICK: string;
  WINE_TRICK_FLAGS: string;
}> &
  CommonObject;
