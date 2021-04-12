import { BaseSchema } from './base';

export * from './array';
export * from './boolean';
export * from './number';
export * from './object';
export * from './schema';
export * from './string';

export type GenerateType<T> = T extends BaseSchema<infer U, infer V>
    ? U
    : never;

export type GenerateFullType<T> = T extends BaseSchema<infer U, infer V>
    ? V
    : T extends BaseSchema<infer U, infer V>
    ? V
    : never;
