import { useAppConfigState } from '@states';
import { useAppConfig } from '@utils';
import { WineApp } from 'desktop-shared';

export const useAppConfigModel = () => {
  const appConfigState = useAppConfigState();
  const appConfig = useAppConfig();

  const read = async () => {
    try {
      appConfigState.reading(true);
      appConfigState.read(await appConfig.read());
    } finally {
      appConfigState.reading(false);
    }
  };

  const write = async (data: WineApp) => {
    try {
      appConfigState.writting(true);
      appConfigState.write(data);
    } finally {
      appConfigState.writting(false);
    }
  };

  const selectConfig = () => appConfigState.store.config;

  return { read, write, selectConfig };
};
