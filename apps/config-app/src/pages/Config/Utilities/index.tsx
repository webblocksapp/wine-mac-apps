import { Component, For } from 'solid-js';
import { IconButton, Grid, Typography } from 'www-shared';
import { FaSolidList, FaSolidFileCode, FaSolidStop } from 'solid-icons/fa';

export const Utilities: Component = () => {
  const items = [
    { name: 'Winetricks', icon: <FaSolidList /> },
    { name: 'View Last Log', icon: <FaSolidFileCode /> },
    { name: 'Kill Wine Procesess', icon: <FaSolidStop /> },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography component="h5">Utilities</Typography>
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
