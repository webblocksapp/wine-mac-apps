import { yup } from '@utils';
import { WineApp, SchemaOf } from '@interfaces';

export const schema: SchemaOf<WineApp> = yup.object({
  name: yup.string().required(),
  engine: yup.string().required(),
  setupExecutablePath: yup.string().required(),
});
