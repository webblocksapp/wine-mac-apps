import { Box, Header } from '@components';
import { Outlet } from '@solidjs/router';
import { Component } from 'solid-js';

export const MainLayout: Component = () => {
  return (
    <Box display="grid" gridTemplateRows="auto 1fr" fullHeight>
      <Header />
      <Box p={3} display="grid" gridTemplateColumns="300px 1fr">
        <Box pt={5} pr={4}>
          <details>
            <summary>Getting started</summary>
            <ul>
              <li>
                <a href="./" id="start-link" class="secondary">
                  Usage
                </a>
              </li>
              <li>
                <a href="./themes.html" id="themes-link" class="secondary">
                  Themes
                </a>
              </li>
              <li>
                <a
                  href="./customization.html"
                  id="customization-link"
                  class="secondary"
                >
                  Customization
                </a>
              </li>
              <li>
                <a
                  href="./classless.html"
                  id="classless-link"
                  class="secondary"
                >
                  Class-less version
                </a>
              </li>
              <li>
                <a href="./rtl.html" id="rtl-link" class="secondary">
                  RTL
                </a>
              </li>
            </ul>
          </details>
        </Box>
        <Box pt={5} pb={4} px={4}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
