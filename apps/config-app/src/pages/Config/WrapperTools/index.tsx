import { Component, For } from 'solid-js';
import { IconButton, Grid, Typography } from 'www-shared';
import {
  FaSolidWater,
  FaSolidBuilding,
  FaSolidSpinner,
  FaSolidPencil,
} from 'solid-icons/fa';

export const WrapperTools: Component = () => {
  const items = [
    { name: 'Refresh Wrapper', icon: <FaSolidWater /> },
    { name: 'Rebuild Wrapper', icon: <FaSolidBuilding /> },
    { name: 'Update Wrapper', icon: <FaSolidSpinner /> },
    { name: 'Change Engine', icon: <FaSolidPencil /> },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography component="h5">Wrapper Tools</Typography>
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
