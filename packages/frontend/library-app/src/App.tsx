import { Component, createEffect, createSignal, onMount, Show } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { routes } from '@routes';
import { useAppModel, useWineEngineModel, useWinetrickModel } from '@models';
import { appWindow } from '@tauri-apps/api/window';
import { CmdArgs, EventPayload } from '@interfaces';
import { Accordion } from '@shared';

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

    appWindow.listen<EventPayload>('cmd-args', (event) => {
      appModel.setCmdArgs(JSON.parse(event.payload.data) as CmdArgs);
    });
    appWindow.emit('mounted');
  };

  createEffect(() => {
    setLoading(initializingEnv());
  });

  appSetup();

  return <Show when={!loading()}>{<Accordion text="XXX" />}</Show>;
};
