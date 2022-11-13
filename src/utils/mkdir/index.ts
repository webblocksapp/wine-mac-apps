import { Command } from '@tauri-apps/api/shell';

export const mkdir = (path: string) => {
  return new Command('run-mkdir', [path]).execute();
};
