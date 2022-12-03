import { CommonObject } from '@interfaces';

export type Env = Partial<{
  EXE_FLAGS: string;
  EXE_PATH: string;
  HOME: string;
  WINE_BASE_PATH: string;
  WINE_LIBS_PATH: string;
  WINE_ENGINES_PATH: string;
  WINE_APPS_PATH: string;
  WINE_APP_PATH: any;
  WINE_APP_SHARED_SUPPORT_PATH: string;
  WINE_APP_LOGS_PATH: string;
  WINE_APP_ENGINE_PATH: string;
  WINE_APP_PREFIX_PATH: string;
  WINE_APP_DRIVE_C_PATH: string;
  WINE_APP_BIN_PATH: string;
  WINE_ENGINE_VERSION: string;
  WINE_TRICK: string;
  WINE_TRICK_FLAGS: string;
}> &
  CommonObject;
