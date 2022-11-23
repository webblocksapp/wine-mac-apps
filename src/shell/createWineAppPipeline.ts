import { Pipeline } from '@interfaces';

export const createWineAppPipeline: Pipeline = {
  name: 'Create wine app - Workflow',
  jobs: [
    {
      name: 'Create wine app - Job',
      steps: [
        {
          name: 'Creating wine app folder',
          script:
            'mkdir -p {{WINE_APP_FOLDER}} && mkdir -p {{WINE_APP_FOLDER}}/wine',
        },
        {
          name: 'Extracting wine engine',
          script: `\\ 
          tar -xf {{WINE_ENGINES_FOLDER}}/{{WINE_ENGINE_VERSION}}.tar.7z -C {{WINE_APP_FOLDER}} -v && \\ 
          mv {{WINE_APP_FOLDER}}/wswine.bundle/* {{WINE_APP_FOLDER}}/wine; \\ 
          rm -r {{WINE_APP_FOLDER}}/wswine.bundle`,
        },
        {
          name: 'Generating wine prefix',
          script:
            '{{WINE_APP_EXPORT_PATH}} WINEPREFIX={{WINE_APP_FOLDER}} wine32on64 wineboot',
        },
      ],
    },
  ],
};
