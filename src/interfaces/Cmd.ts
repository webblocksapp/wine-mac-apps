import { Command } from '@tauri-apps/api/shell';

export type Cmd = Omit<Command, 'spawn' | 'execute'>;
