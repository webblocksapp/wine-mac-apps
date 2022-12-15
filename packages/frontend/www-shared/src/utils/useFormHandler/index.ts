import {
  FormHandlerOptions,
  useFormHandler as useBaseFormHandler,
  yupSchema,
} from 'solid-form-handler';
import { SchemaOf } from 'yup';

export const useFormHandler = <T>(
  schema: SchemaOf<T, never>,
  options?: FormHandlerOptions
) => {
  return useBaseFormHandler<T>(yupSchema(schema), {
    silentValidation: true,
    ...options,
  });
};
