import {
  FormHandlerOptions,
  useFormHandler as useBaseFormHandler,
  yupSchema,
} from 'solid-form-handler';
import { AnyObjectSchema } from 'yup';

export const useFormHandler = <T>(
  schema: AnyObjectSchema,
  options?: FormHandlerOptions
) => {
  return useBaseFormHandler<T>(yupSchema(schema), {
    silentValidation: true,
    ...options,
  });
};
