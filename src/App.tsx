import { Component } from 'solid-js';
import { Button } from '@components';
import { useWine } from '@utils';

export const App: Component = () => {
  const createWineAppPrefix = async () => {
    const wine = await useWine({ appName: 'steam' });
    try {
      wine.createWineAppPrefix();
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
        </li>
        <li>
          (If required) Run winetricks command.
          <pre>
            <code>
              WINEPREFIX="path/to/app-name-prefix" winetricks --force -q lib1
              lib2
            </code>
          </pre>
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
      </ol>
    </div>
  );
};

export default App;
