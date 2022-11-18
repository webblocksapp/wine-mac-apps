import { RouteDefinition } from '@solidjs/router';
import { WineAppManager } from '@pages';
import { MainLayout } from '@layouts';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: MainLayout,
    children: [{ path: '', component: WineAppManager }],
  },
];
