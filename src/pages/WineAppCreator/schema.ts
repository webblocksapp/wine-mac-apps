import { yup } from '@utils';
import { WineApp, SchemaOf } from '@interfaces';

export const schema: SchemaOf<WineApp> = yup.object({
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
  winetricksVerbs: yup.array(yup.mixed()).optional(),
});
