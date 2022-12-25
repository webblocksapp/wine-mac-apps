import { Outlet } from '@solidjs/router';
import { Component } from 'solid-js';
import { Box } from 'www-shared';

export const MainLayout: Component = () => {
  return (
    <Box display="grid" fullHeight>
      <Box display="grid">
        <Box pt={4} px={4}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
