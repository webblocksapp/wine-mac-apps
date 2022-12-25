import { Component, For } from 'solid-js';
import { IconButton, Grid, Typography } from 'www-shared';
import {
  FaSolidGear,
  FaSolidBoxArchive,
  FaSolidBarsProgress,
  FaSolidCode,
  FaSolidTrashCan,
} from 'solid-icons/fa';

export const WineTools: Component = () => {
  const items = [
    { name: 'Wine Config', icon: <FaSolidGear /> },
    { name: 'Registry Editor', icon: <FaSolidBoxArchive /> },
    { name: 'Task Manager', icon: <FaSolidBarsProgress /> },
    { name: 'CMD', icon: <FaSolidCode /> },
    { name: 'Uninstaller', icon: <FaSolidTrashCan /> },
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
            />
          </Grid>
        )}
      </For>
    </Grid>
  );
};
