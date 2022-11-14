import {
  Component,
  createEffect,
  createSignal,
  Match,
  onMount,
  Switch,
} from 'solid-js';
import { Button } from '@components';
import { useWine } from '@utils';
import { envState, setEnvState } from './states/envState';
import { homeDir } from '@tauri-apps/api/path';

export const App: Component = () => {
  const [loading, setLoading] = createSignal(true);
  const wine = useWine({ appName: 'steam', engine: 'WS11WineCX64Bit22.0.1' });

  const initEnv = async () => {
    const HOME = await homeDir();
    setEnvState('HOME', HOME.replace(/\/$/, ''));
    setEnvState('WINE_BASE_FOLDER', `${envState.HOME}/Wine`);
    setEnvState('WINE_ENGINES_FOLDER', `${envState.WINE_BASE_FOLDER}/engines`);
    setEnvState('WINE_APPS_FOLDER', `${envState.WINE_BASE_FOLDER}/apps`);
    setEnvState('WINE_BIN_PATH', `${envState.WINE_BIN_PATH}/wine/bin`);
    setEnvState('WINE_EXPORT_PATH', `PATH="${envState.WINE_BIN_PATH}:$PATH"`);
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
              <Button onClick={wine.buildWineForApp}>Engine</Button>
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
              Output
              <pre>
                <code>{wine.output()}</code>
              </pre>
            </li>
          </ol>
        </Match>
      </Switch>
    </div>
  );
};

export default App;
function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
