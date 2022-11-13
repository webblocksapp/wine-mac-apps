import { Command } from '@tauri-apps/api/shell';

export const winecfg = (wineprefix: string) => {
  return new Command('run-winecfg', ['-c', `${wineprefix} winecfg`]).execute();
};
