import { Command } from '@tauri-apps/api/shell';

export const runScript = (script: string) => {
  return new Command('run-script', ['-c', script]).execute();
};
