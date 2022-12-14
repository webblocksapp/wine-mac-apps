import { Component, For, JSXElement } from 'solid-js';
import { IconButton, Grid, Typography } from 'www-shared';
import {
  FaSolidGear,
  FaSolidBoxArchive,
  FaSolidBarsProgress,
  FaSolidCode,
  FaSolidTrashCan,
  FaSolidFile,
} from 'solid-icons/fa';
import { useWineApp, WineTool } from 'desktop-shared';
import { createStore } from 'solid-js/store';

export const WineTools: Component = () => {
  const wineApp = useWineApp();
  const [store, setStore] = createStore({
    winecfg: { running: false },
    regedit: { running: false },
    taskmgr: { running: false },
    cmd: { running: false },
    uninstaller: { running: false },
    winefile: { running: false },
  });

  const runWineTool = async (tool: WineTool) => {
    setStore(tool, 'running', true);
    const { cmd } = await wineApp[tool]();
    cmd.on('close', () => {
      setStore(tool, 'running', false);
    });
    cmd.stderr.on('data', (data) => console.error(data));
    cmd.stdout.on('data', (data) => console.log(data));
  };

  const items: Array<{
    name: string;
    icon: JSXElement;
    tool: WineTool;
    runWineTool: (tool: WineTool) => Promise<void>;
  }> = [
    {
      name: 'Wine Config',
      icon: <FaSolidGear />,
      tool: 'winecfg',
      runWineTool,
    },
    {
      name: 'Registry Editor',
      icon: <FaSolidBoxArchive />,
      tool: 'regedit',
      runWineTool,
    },
    {
      name: 'Task Manager',
      icon: <FaSolidBarsProgress />,
      tool: 'taskmgr',
      runWineTool,
    },
    { name: 'CMD', icon: <FaSolidCode />, tool: 'cmd', runWineTool },
    {
      name: 'Uninstaller',
      icon: <FaSolidTrashCan />,
      tool: 'uninstaller',
      runWineTool,
    },
    {
      name: 'File Explorer',
      icon: <FaSolidFile />,
      tool: 'winefile',
      runWineTool,
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography component="h5">Wine Tools</Typography>
      </Grid>
      <For each={items}>
        {(item) => (
          <Grid item xs={12} md={4}>
            <IconButton
              style={{ 'min-width': '250px' }}
              icon={item.icon}
              text={item.name}
              onClick={() => item.runWineTool(item.tool as WineTool)}
              disabled={store[item.tool as WineTool].running}
            />
          </Grid>
        )}
      </For>
    </Grid>
  );
};
