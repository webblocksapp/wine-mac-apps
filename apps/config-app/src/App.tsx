import { Component, createSignal, Show } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { routes } from '@routes';
import { useAppConfigModel } from '@models';

export const App: Component = () => {
  const appConfigModel = useAppConfigModel();
  const [loading, setLoading] = createSignal(true);

  const init = async () => {
    setLoading(true);
    await Promise.all([appConfigModel.read()]);
    setLoading(false);
  };

  init();

  return <Show when={!loading()}>{useRoutes(routes)}</Show>;
};
