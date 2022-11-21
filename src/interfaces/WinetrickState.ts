import { Winetrick } from '@interfaces';

export type WinetrickState = {
  winetricks: {
    apps: Winetrick[];
    benchmarks: Winetrick[];
    dlls: Winetrick[];
    fonts: Winetrick[];
    games: Winetrick[];
    settings: Winetrick[];
  };
  listingApps: boolean;
  listingBenchmarks: boolean;
  listingDlls: boolean;
  listingFonts: boolean;
  listingGames: boolean;
  listingSettings: boolean;
  listing: boolean;
};
