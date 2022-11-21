import { Component, createEffect, createSignal } from 'solid-js';
import { Select, SelectProps } from '@components';
import { WineEngine, SelectableOption, Id } from '@interfaces';
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

  createEffect(() => {
    setOptions(() => {
      const options: SelectableOption[] = [];
      wineEngines().forEach((engine) => {
        options.push({ value: engine.id as number, label: engine.name });
      });

      return options;
    });
  });

  const mapConfig: SelectProps['mapConfig'] = {
    fn: (id: Id) => wineEngines().find((item) => item.id == id),
    valueKey: 'id',
  };

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
