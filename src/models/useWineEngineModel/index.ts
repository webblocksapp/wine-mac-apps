import { useWineEngineApiClient } from '@api-clients';
import { useWineEngineState } from '@states';

export const useWineEngineModel = () => {
  const wineEngineApiClient = useWineEngineApiClient();
  const wineEngineState = useWineEngineState();

  const list = async () => {
    try {
      wineEngineState.listing(true);
      wineEngineState.list(await wineEngineApiClient.list());
    } finally {
      wineEngineState.listing(false);
    }
  };

  const selectWineEngines = () => {
    return () => wineEngineState.store.wineEngines;
  };

  return { list, selectWineEngines };
};
