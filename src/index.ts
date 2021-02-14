import { BaseSchema } from './base';

export * from './array';
export * from './boolean';
export * from './number';
export * from './object';
export * from './schema';
export * from './string';

export type GenerateType<T> = T extends BaseSchema<infer U> ? U : never;
