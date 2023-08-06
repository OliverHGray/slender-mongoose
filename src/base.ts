import { Schema, SchemaTypeOptions } from 'mongoose';

export interface BaseSchema<Type, PartialType> {
    generateSchema: GenerateSchema;

    // TypeScript loses the Type if it isn't used.
    getExample: () => Type;
    getPartialExample: () => PartialType;
}

export type GenerateSchema = (
    schemaConstructor: typeof Schema,
) => MongooseSchemaDefinition;

export type MongooseSchemaDefinition =
    | Schema
    | SchemaTypeOptions<any>
    | {
          [key: string]: SchemaTypeOptions<any> | MongooseSchemaDefinition;
      }
    | [MongooseSchemaDefinition];

export type MaintainOptionality<Current, New> = Current extends undefined
    ? New | undefined
    : New;
