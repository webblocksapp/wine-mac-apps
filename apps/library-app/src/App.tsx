import { Component, createEffect, createSignal, Show } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { routes } from '@routes';
import {
  useAppModel,
  useWineEngineModel,
  useWinetrickModel,
} from 'desktop-shared';

export const App: Component = () => {
  const appModel = useAppModel();
  const wineEngineModel = useWineEngineModel();
  const winetrickModel = useWinetrickModel();
  const initializingEnv = appModel.selectInitializingEnv();
  const [loading, setLoading] = createSignal(true);

  const appSetup = async () => {
    Promise.all([
      appModel.initEnv(),
      wineEngineModel.list(),
      winetrickModel.list(),
    ]);
  };

  createEffect(() => {
    setLoading(initializingEnv());
  });

  appSetup();

  return <Show when={!loading()}>{useRoutes(routes)}</Show>;
};
