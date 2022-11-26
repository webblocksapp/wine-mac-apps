export const winetrickScript = `
  {{WINE_APP_EXPORT_PATH}} WINEPREFIX={{WINE_APP_FOLDER}} 
  WINE={{WINE_APP_BIN_PATH}}/wine32on64 
  winetricks {{WINE_TRICK_FLAGS}} {{WINE_TRICK}};
`;
