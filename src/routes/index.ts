import { RouteDefinition } from '@solidjs/router';
import { TestFlow, WineAppCreator } from '@pages';
import { MainLayout } from '@layouts';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: MainLayout,
    children: [{ path: '', component: WineAppCreator }],
  },
];
