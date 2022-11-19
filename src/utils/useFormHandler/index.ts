import {
  useFormHandler as useBaseFormHandler,
  yupSchema,
} from 'solid-form-handler';
import { AnyObjectSchema } from 'yup';

export const useFormHandler = <T>(schema: AnyObjectSchema) => {
  return useBaseFormHandler<T>(yupSchema(schema));
};
