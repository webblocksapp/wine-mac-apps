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
                  text: 'Item 1',
                  children: [
                    { text: 'Item 1-1' },
                    {
                      text: 'Item 1-2',
                      children: [
                        { text: 'Item 1-2-1' },
                        { text: 'Item 1-2-2' },
                        { text: 'Item 1-2-3' },
                      ],
                    },
                    { text: 'Item 1-3' },
                  ],
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
