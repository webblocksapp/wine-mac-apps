import { Box, Header, Sidebar, TreeMenu } from '@components';
import { Outlet } from '@solidjs/router';
import { Component } from 'solid-js';
import './index.css';

export const MainLayout: Component = () => {
  return (
    <Box display="grid" gridTemplateRows="auto 1fr" fullHeight>
      <Header />
      <Box display="grid" gridTemplateColumns="300px 1fr">
        <Sidebar pr={4}>
          <TreeMenu
            menu={[
              {
                text: 'Create App',
                route: '/',
              },
              {
                text: 'Test flow',
                route: '/test',
              },
            ]}
          />
        </Sidebar>
        <Box pt={4} px={4}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
