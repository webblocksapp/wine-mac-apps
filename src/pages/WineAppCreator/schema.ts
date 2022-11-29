import { yup } from '@utils';
import { WineApp, SchemaOf } from '@interfaces';

export type Schema = WineApp & { useWinetricks: boolean };

export const schema: SchemaOf<Schema> = yup.object({
  id: yup.mixed().optional(),
  name: yup.string().required(),
  engine: yup
    .object({
      id: yup.mixed().optional(),
      version: yup.string().required(),
      url: yup.string().required(),
    })
    .required(),
  setupExecutablePath: yup.string().required(),
  useWinetricks: yup.boolean().required(),
  dxvkEnabled: yup.boolean().required(),
  winetricksVerbs: yup
    .array(yup.mixed())
    .when('useWinetricks', { is: true, then: yup.array(yup.mixed()).min(1) }),
});
