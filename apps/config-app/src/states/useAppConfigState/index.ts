import { WineApp } from 'desktop-shared';
import { createStore } from 'solid-js/store';

const [store, setStore] = createStore<{
  config: WineApp;
  reading: boolean;
  writting: boolean;
}>({
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
  reading: false,
  writting: false,
});

export const useAppConfigState = () => {
  const read = (data: WineApp) => {
    setStore('config', (prev) => ({ ...prev, ...data }));
  };

  const reading = (flag: boolean) => {
    setStore('reading', flag);
  };

  const write = (data: Partial<WineApp>) => {
    setStore('config', (prev) => ({ ...prev, ...data }));
  };

  const writting = (flag: boolean) => {
    setStore('writting', flag);
  };

  return {
    read,
    reading,
    write,
    writting,
    store,
  };
};
