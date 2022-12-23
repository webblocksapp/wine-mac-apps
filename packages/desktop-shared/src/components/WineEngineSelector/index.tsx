import { Component, createEffect, createSignal } from 'solid-js';
import { Select, SelectProps, SelectableOption, Id } from 'www-shared';
import { WineEngine } from '@interfaces';
import { useWineEngineModel } from '@models';

export interface WineEngineSelectorProps
  extends Omit<SelectProps, 'options' | 'label' | 'placeholder' | 'value'> {
  value?: WineEngine;
}

export const WineEngineSelector: Component<WineEngineSelectorProps> = (
  props
) => {
  const [options, setOptions] = createSignal<SelectableOption[]>([]);
  const wineEngineModel = useWineEngineModel();
  const wineEngines = wineEngineModel.selectWineEngines();

  const mapConfig: SelectProps['mapConfig'] = {
    fn: (id: Id) => wineEngines().find((item) => item.id == id),
    valueKey: 'id',
  };

  createEffect(() => {
    setOptions(() => {
      const options: SelectableOption[] = [];
      wineEngines().forEach((engine) => {
        options.push({ value: engine.id as number, label: engine.version });
      });

      return options;
    });
  });

  return (
    <Select
      {...props}
      label="Wine Engine"
      placeholder="Select an engine"
      options={options()}
      mapConfig={mapConfig}
    />
  );
};
