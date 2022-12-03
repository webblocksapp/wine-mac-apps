import { Box, Header, Sidebar, TreeMenu } from '@components';
import { Outlet } from '@solidjs/router';
import { Component } from 'solid-js';

export const MainLayout: Component = () => {
  return (
    <Box display="grid" gridTemplateRows="auto 1fr" fullHeight>
      <Header />
      <Box p={3} display="grid" gridTemplateColumns="300px 1fr">
        <Box pr={4}>
          <Sidebar>
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
        </Box>
        <Box pt={4} px={4}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
