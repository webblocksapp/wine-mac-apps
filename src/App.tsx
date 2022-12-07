import { Component, createEffect, createSignal, onMount, Show } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { routes } from '@routes';
import { useAppModel, useWineEngineModel, useWinetrickModel } from '@models';
import { listen, emit } from '@tauri-apps/api/event';

export const App: Component = () => {
  const appModel = useAppModel();
  const wineEngineModel = useWineEngineModel();
  const winetrickModel = useWinetrickModel();
  const initializingEnv = appModel.selectInitializingEnv();
  const [loading, setLoading] = createSignal(true);

  const appSetup = () => {
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

  onMount(() => {
    emit('app-mounted');
  });

  return <Show when={!loading()}>{useRoutes(routes)}</Show>;
};
