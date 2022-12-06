import { yup } from '@utils';
import { WineApp, SchemaOf } from '@interfaces';

export type Schema = WineApp & { useWinetricks: boolean };

const winetricksSchema = (opts: { minVerbs: number }) =>
  yup.object({
    verbs: yup.array(yup.string().required()).min(opts.minVerbs),
    options: yup.object({
      unattended: yup.boolean().default(true),
      force: yup.boolean().default(true),
    }),
  });

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
  winetricks: winetricksSchema({ minVerbs: 0 }).when('useWinetricks', {
    is: true,
    then: winetricksSchema({ minVerbs: 1 }),
  }),
  executables: yup
    .array(
      yup.object({
        path: yup.string().required(),
        main: yup.boolean().required(),
        flags: yup.string().optional(),
      })
    )
    .default([]),
});
