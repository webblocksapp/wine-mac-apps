import { Winetrick } from '@interfaces';
import { useShellRunner } from '@utils';
import { resolveResource } from '@tauri-apps/api/path';

export const useWinetrickApiClient = () => {
  const { executeScript } = useShellRunner();

  const mapResponse = (data: string = ''): Winetrick[] => {
    const mappedData: Winetrick[] = [];
    const rows = data.split('\n');
    for (let row of rows) {
      if (!row) continue;
      const [verb, description] = row.replace(/\s/, '--_--').split('--_--');

      mappedData.push({
        verb,
        description: description?.replace?.(/^\s+/, ''),
      });
    }
    return mappedData;
  };

  const listApps = async () => {
    return runWinetricks('apps list');
  };

  const listBenchmarks = async () => {
    return runWinetricks('benchmarks list');
  };

  const listDlls = async () => {
    return runWinetricks('dlls list');
  };

  const listFonts = async () => {
    return runWinetricks('fonts list');
  };

  const listGames = async () => {
    return runWinetricks('games list');
  };

  const listSettings = () => {
    return runWinetricks('settings list');
  };

  const runWinetricks = async (cmd: string) => {
    const WINETRICKS_PATH = await resolveResource('bash');
    const { stdout, stderr } = await executeScript(
      `${WINETRICKS_PATH}/winetricks.sh ${cmd}`
    );

    console.log({ stdout, stderr });

    return mapResponse(stdout);
  };

  return {
    listApps,
    listBenchmarks,
    listDlls,
    listFonts,
    listGames,
    listSettings,
  };
};
