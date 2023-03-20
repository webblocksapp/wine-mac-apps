import React from 'react';
import { ThemeProvider } from '../src/components';
import { Router } from '@solidjs/router';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
};

export const decorators = [
  (Story) => (
    <Router children={<ThemeProvider children={<Story />} />}></Router>
  ),
];
