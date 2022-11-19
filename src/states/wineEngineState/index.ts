import { WineEngine, WineEngineState } from '@interfaces';
import { createStore } from 'solid-js/store';

const [store, setStore] = createStore<WineEngineState>({
  wineEngines: [],
  listing: false,
});

export const useWineEngineState = () => {
  const list = (wineEngines: WineEngine[]) => {
    setStore('wineEngines', wineEngines);
  };

  const listing = (flag: boolean) => {
    setStore('listing', flag);
  };

  return { list, listing, store };
};
