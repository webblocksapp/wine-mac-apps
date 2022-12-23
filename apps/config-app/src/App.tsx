import { Component } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { routes } from '@routes';

export const App: Component = () => {
  return useRoutes(routes);
};
