import { Winetrick, WinetrickState } from '@interfaces';
import { createStore } from 'solid-js/store';

const [store, setStore] = createStore<WinetrickState>({
  winetricks: {
    apps: [],
    benchmarks: [],
    dlls: [],
    fonts: [],
    games: [],
    settings: [],
  },
  listingApps: false,
  listingBenchmarks: false,
  listingDlls: false,
  listingFonts: false,
  listingGames: false,
  listingSettings: false,
  listing: false,
});

export const useWinetrickState = () => {
  const listApps = (winetricks: Winetrick[]) => {
    setStore('winetricks', 'apps', winetricks);
  };

  const listingApps = (flag: boolean) => {
    setStore('listingApps', flag);
  };

  const listBenchmarks = (winetricks: Winetrick[]) => {
    setStore('winetricks', 'benchmarks', winetricks);
  };

  const listingBenchmarks = (flag: boolean) => {
    setStore('listingApps', flag);
  };

  const listDlls = (winetricks: Winetrick[]) => {
    setStore('winetricks', 'dlls', winetricks);
  };

  const listingDlls = (flag: boolean) => {
    setStore('listingDlls', flag);
  };

  const listFonts = (winetricks: Winetrick[]) => {
    setStore('winetricks', 'fonts', winetricks);
  };

  const listingFonts = (flag: boolean) => {
    setStore('listingFonts', flag);
  };

  const listGames = (winetricks: Winetrick[]) => {
    setStore('winetricks', 'games', winetricks);
  };

  const listingGames = (flag: boolean) => {
    setStore('listingGames', flag);
  };

  const listSettings = (winetricks: Winetrick[]) => {
    setStore('winetricks', 'settings', winetricks);
  };

  const listingSettings = (flag: boolean) => {
    setStore('listingSettings', flag);
  };

  const listing = (flag: boolean) => {
    setStore('listing', flag);
  };

  return {
    listApps,
    listingApps,
    listBenchmarks,
    listingBenchmarks,
    listDlls,
    listingDlls,
    listFonts,
    listingFonts,
    listGames,
    listingGames,
    listSettings,
    listingSettings,
    listing,
    store,
  };
};
