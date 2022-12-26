import { WineApp, useAppState as useBaseAppState } from 'desktop-shared';
import { AppState } from '@interfaces';
import { createStore } from 'solid-js/store';

const baseAppState = useBaseAppState();
const [store, setStore] = createStore<AppState>({
  ...baseAppState.store,
  config: {
    name: '',
    engine: { url: '', version: '' },
    setupExecutablePath: '',
    winetricks: {
      verbs: [],
      options: {},
    },
    dxvkEnabled: false,
    executables: [],
  },
  initializingConfig: false,
  updatingConfig: false,
});

export const useAppState = () => {
  const initConfig = (data: WineApp) => {
    setStore('config', (prev) => ({ ...prev, ...data }));
  };

  const initializingConfig = (flag: boolean) => {
    setStore('initializingConfig', flag);
  };

  const updateConfig = (data: Partial<WineApp>) => {
    setStore('config', (prev) => ({ ...prev, ...data }));
  };

  const updatingConfig = (flag: boolean) => {
    setStore('updatingConfig', flag);
  };

  return {
    ...baseAppState,
    initConfig,
    initializingConfig,
    updateConfig,
    updatingConfig,
    store,
  };
};
