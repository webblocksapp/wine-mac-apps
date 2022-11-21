import { yup } from '@utils';
import { WineApp, SchemaOf } from '@interfaces';

export const schema: SchemaOf<WineApp> = yup.object({
  name: yup.string().required(),
  engine: yup
    .object({
      id: yup.mixed().optional(),
      name: yup.string().required(),
      url: yup.string().required(),
    })
    .required(),
  setupExecutablePath: yup.string().required(),
  winetricks: yup.array(yup.string()),
});
