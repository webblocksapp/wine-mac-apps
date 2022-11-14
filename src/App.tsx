import { Component, createSignal } from 'solid-js';
import { Button } from '@components';
import { useWine } from '@utils';

export const App: Component = () => {
  const appName = 'steam';
  const [output, setOutput] = createSignal<string>('');

  const createWineAppPrefix = async () => {
    const wine = await useWine({ appName });
    try {
      wine.createWineAppPrefix();
    } catch (error) {
      console.error(error);
    }
  };

  const winecfg = async () => {
    const wine = await useWine({ appName });
    try {
      wine.winecfg();
    } catch (error) {
      console.error(error);
    }
  };

  const winetricks = async () => {
    const wine = await useWine({ appName });
    try {
      const childProcess = await wine.winetricks(['steam'], { silent: false });
      setOutput(childProcess.stdout);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style="padding: 20px;">
      <ol>
        <li>
          Create a prefix folder with the app name inside home folder.
          <pre>
            <code>mkdir $HOME/wine-apps/app-name-prefix</code>
          </pre>
        </li>
        <li>
          Run the winecfg command.
          <pre>
            <code>WINEPREFIX="path/to/app-name-prefix" winecfg</code>
          </pre>
          <Button onClick={createWineAppPrefix}>Create wine app prefix</Button>
          <Button onClick={winecfg}>Winecfg</Button>
        </li>
        <li>
          (If required) Run winetricks command.
          <pre>
            <code>
              WINEPREFIX="path/to/app-name-prefix" winetricks --force -q lib1
              lib2
            </code>
          </pre>
          <Button onClick={winetricks}>winetricks steam</Button>
        </li>
        <li>
          Run the app.
          <pre>
            <code>
              WINEPREFIX="path/to/app-name-prefix" wine
              path/to/app-name-prefix/app.exe
            </code>
          </pre>
        </li>
        <li>
          Output
          <pre>
            <code>{output()}</code>
          </pre>
        </li>
      </ol>
    </div>
  );
};

export default App;
