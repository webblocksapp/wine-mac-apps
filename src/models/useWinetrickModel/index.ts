import { useWinetrickApiClient } from '@api-clients';
import { useWinetrickState } from '@states';

export const useWinetrickModel = () => {
  const winetrickApiClient = useWinetrickApiClient();
  const winetrickState = useWinetrickState();

  const listApps = async () => {
    try {
      winetrickState.listingApps(true);
      winetrickState.listApps(await winetrickApiClient.listApps());
    } finally {
      winetrickState.listingApps(false);
    }
  };

  const listBenchmarks = async () => {
    try {
      winetrickState.listingBenchmarks(true);
      winetrickState.listBenchmarks(await winetrickApiClient.listBenchmarks());
    } finally {
      winetrickState.listingBenchmarks(false);
    }
  };

  const listDlls = async () => {
    try {
      winetrickState.listingDlls(true);
      winetrickState.listDlls(await winetrickApiClient.listDlls());
    } finally {
      winetrickState.listingDlls(false);
    }
  };

  const listFonts = async () => {
    try {
      winetrickState.listingFonts(true);
      winetrickState.listFonts(await winetrickApiClient.listFonts());
    } finally {
      winetrickState.listingFonts(false);
    }
  };

  const listGames = async () => {
    try {
      winetrickState.listingGames(true);
      winetrickState.listGames(await winetrickApiClient.listGames());
    } finally {
      winetrickState.listingGames(false);
    }
  };

  const listSettings = async () => {
    try {
      winetrickState.listingSettings(true);
      winetrickState.listSettings(await winetrickApiClient.listSettings());
    } finally {
      winetrickState.listingSettings(false);
    }
  };

  const selectWinetricks = () => {
    return winetrickState.store.winetricks;
  };

  const selectWinetricksApps = () => {
    return winetrickState.store.winetricks.apps;
  };

  const selectWinetricksBenchmarks = () => {
    return winetrickState.store.winetricks.benchmarks;
  };

  const selectWinetricksDlls = () => {
    return winetrickState.store.winetricks.dlls;
  };

  const selectWinetricksFonts = () => {
    return winetrickState.store.winetricks.fonts;
  };

  const selectWinetricksGames = () => {
    return winetrickState.store.winetricks.games;
  };

  const selectWinetricksSettings = () => {
    return winetrickState.store.winetricks.settings;
  };

  return {
    listApps,
    listBenchmarks,
    listDlls,
    listFonts,
    listGames,
    listSettings,
    selectWinetricks,
    selectWinetricksApps,
    selectWinetricksBenchmarks,
    selectWinetricksDlls,
    selectWinetricksFonts,
    selectWinetricksGames,
    selectWinetricksSettings,
  };
};
