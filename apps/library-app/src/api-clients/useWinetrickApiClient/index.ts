import { Winetrick } from '@interfaces';
import { useShellRunner } from '@utils';

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
    const { stdout } = await executeScript(`winetricks apps list`);
    return mapResponse(stdout);
  };

  const listBenchmarks = async () => {
    const { stdout } = await executeScript(`winetricks benchmarks list`);
    return mapResponse(stdout);
  };

  const listDlls = async () => {
    const { stdout } = await executeScript(`winetricks dlls list`);
    return mapResponse(stdout);
  };

  const listFonts = async () => {
    const { stdout } = await executeScript(`winetricks fonts list`);
    return mapResponse(stdout);
  };

  const listGames = async () => {
    const { stdout } = await executeScript(`winetricks games list`);
    return mapResponse(stdout);
  };

  const listSettings = async () => {
    const { stdout } = await executeScript(`winetricks settings list`);
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
