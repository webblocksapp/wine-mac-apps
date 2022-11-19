import { yup } from '@utils';
import { SchemaOf } from '@interfaces';

export const schema: SchemaOf<{ name: string; engine: string }> = yup.object({
  name: yup.string().required(),
  engine: yup.string().required(),
});
