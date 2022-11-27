export const extractWineEngineScript = `
  tar -xf {{WINE_ENGINES_FOLDER}}/{{WINE_ENGINE_VERSION}}.tar.7z -C {{WINE_APP_FOLDER}} -v;
  mv {{WINE_APP_FOLDER}}/wswine.bundle/* {{WINE_APP_ENGINE_PATH}};
  rm -r {{WINE_APP_FOLDER}}/wswine.bundle;
`;
