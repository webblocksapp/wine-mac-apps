import { createStore } from 'solid-js/store';
import { EnvState } from '@interfaces';

export const [envState, setEnvState] = createStore<EnvState>({
  HOME: '',
  WINE_BASE_FOLDER: '',
  WINE_ENGINES_FOLDER: '',
  WINE_APPS_FOLDER: '',
  WINE_BIN_PATH: '',
  WINE_EXPORT_PATH: '',
});
