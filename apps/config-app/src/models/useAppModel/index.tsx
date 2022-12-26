import { useAppState } from '@states';
import { useAppConfig } from '@utils';
import { useAppModel as useBaseAppModel, WineApp } from 'desktop-shared';

export const useAppModel = () => {
  const baseAppModel = useBaseAppModel();
  const appState = useAppState();
  const appConfig = useAppConfig();

  const initConfig = async () => {
    try {
      appState.initializingConfig(true);
      appState.initConfig(await appConfig.read());
    } finally {
      appState.initializingConfig(false);
    }
  };

  const updateConfig = async (data: WineApp) => {
    try {
      appState.updatingConfig(true);
      appState.updateConfig(data);
    } finally {
      appState.updatingConfig(false);
    }
  };

  const selectConfig = () => appState.store.config;

  return { ...baseAppModel, initConfig, updateConfig, selectConfig };
};
