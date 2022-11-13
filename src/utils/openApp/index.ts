import { Command } from '@tauri-apps/api/shell';

export const openApp = (name: string) => {
  return new Command('run-open', ['-a', name]).execute();
};
