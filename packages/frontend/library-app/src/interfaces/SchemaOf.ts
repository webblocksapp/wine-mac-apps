import { SchemaOf as YupSchemaOf } from 'yup';

export type SchemaOf<T, CustomTypes = never> = YupSchemaOf<T, CustomTypes>;
