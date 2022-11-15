import { Component, createSignal, Match, Switch } from 'solid-js';
import { Button } from '@components';
import { envState, setEnvState } from '@states';
import { homeDir } from '@tauri-apps/api/path';
import { useWineApp } from '@utils';

export const App: Component = () => {
  const [loading, setLoading] = createSignal(true);
  const wine = useWineApp({
    appName: 'steam',
    engine: 'WS11WineCX64Bit22.0.1',
  });

  const initEnv = async () => {
    const HOME = (await homeDir()).replace(/\/$/, '');
    const WINE_BASE_FOLDER = `${HOME}/Wine`;
    const WINE_ENGINES_FOLDER = `${WINE_BASE_FOLDER}/engines`;
    const WINE_APPS_FOLDER = `${WINE_BASE_FOLDER}/apps`;

    setEnvState({
      HOME: (await homeDir()).replace(/\/$/, ''),
      WINE_BASE_FOLDER,
      WINE_ENGINES_FOLDER,
      WINE_APPS_FOLDER,
    });

    setLoading(false);
  };

  initEnv();

  return (
    <div style="padding: 20px;">
      <Switch>
        <Match when={loading()}>Loading...</Match>
        <Match when={loading() === false}>
          <ol>
            <li>
              <Button onClick={wine.createWineApp}>Engine</Button>
            </li>
            {/* <li>
              Run the winecfg command.
              <pre>
                <code>WINEPREFIX="path/to/app-name-prefix" winecfg</code>
              </pre>
              <Button onClick={wine.buildWineForApp}>Engine</Button>
              <Button onClick={wine.createWineAppPrefix}>
                Create wine app prefix
              </Button>
              <Button onClick={wine.winecfg}>Winecfg</Button>
            </li>
            <li>
              (If required) Run winetricks command.
              <pre>
                <code>
                  WINEPREFIX="path/to/app-name-prefix" winetricks --force -q
                  lib1 lib2
                </code>
              </pre>
              <Button onClick={() => wine.winetricks(['steam'])}>
                winetricks steam
              </Button>
            </li>
            <li>
              Run the app.
              <pre>
                <code>
                  WINEPREFIX="path/to/app-name-prefix" wine
                  path/to/app-name-prefix/app.exe
                </code>
              </pre>
            </li> */}
            <li>
              Pipeline
              <pre>
                <code>{JSON.stringify(wine.pipeline, null, 2)}</code>
              </pre>
            </li>
            <li>
              Output
              <pre>
                <code>{wine.consoleOutput()}</code>
              </pre>
            </li>
          </ol>
        </Match>
      </Switch>
    </div>
  );
};
