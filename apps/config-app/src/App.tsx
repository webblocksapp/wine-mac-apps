import { Component, createSignal, Show } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { routes } from '@routes';
import { useAppModel } from '@models';

export const App: Component = () => {
  const appModel = useAppModel();
  const [loading, setLoading] = createSignal(true);

  const init = async () => {
    setLoading(true);
    await Promise.all([appModel.initEnv(), appModel.initConfig()]);
    setLoading(false);
  };

  init();

  return <Show when={!loading()}>{useRoutes(routes)}</Show>;
};
