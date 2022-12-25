import { writeTextFile, readTextFile } from '@tauri-apps/api/fs';
import { resolveResource } from '@tauri-apps/api/path';
import { WineApp } from 'desktop-shared';

export const useAppConfig = () => {
  const configPath = resolveResource('data/config.json');

  const read = async () => {
    return JSON.parse(await readTextFile(await configPath)) as WineApp;
  };

  const write = async (data: Partial<WineApp>) => {
    writeTextFile(await configPath, JSON.stringify(data, null, 2));
  };

  return { read, write };
};
